import type { ProvidersEnum } from '@/@types/media-type-enum'
import type { ImportMovie } from '@/domain/entities/import-movies'
import type { ListResponse } from '@plotwist_app/tmdb/dist/utils/list-response'
import type {
  MovieWithMediaType,
  PersonWithMediaType,
  TvSerieWithMediaType,
} from '@plotwist_app/tmdb'

import { config } from '@/config'
import { consumeMessages } from './consumer'
import { searchTMDBMovie } from '@/domain/services/tmdb/search-tmdb-movie'
import { updateImportMoviesStatus } from '@/db/repositories/import-movies-repository'

import { getImportMovieById } from '@/domain/services/imports/get-import-movie-by-id'
import type { MALAnimes } from '@/@types/my-anime-list-import'
import { SqsAdapter } from '@/adapters/sqs'

type ImportMovieMessage = {
  id: string
  name: string
  idempotencyKey: string
  provider: ProvidersEnum
}
export async function startMovieConsumer() {
  const movieQueueUrl = config.sqsQueues.IMPORT_MOVIES_QUEUE
  const processMovieMessage = async (
    message: string,
    receiptHandle: string
  ) => {
    try {
      const parsedMessage: ImportMovieMessage = JSON.parse(message)

      const movie = await getImportMovieById(parsedMessage.id)

      const tmdbResult = await searchTMDBMovie(parsedMessage.name)

      const recoveredMovie = await handleResult(
        movie,
        parsedMessage.provider,
        tmdbResult
      )

      if (!recoveredMovie) {
        await updateImportMoviesStatus(parsedMessage.id, 'FAILED')
      }

      if (recoveredMovie === 'wait') {
        return
      }

      await SqsAdapter.deleteMessage(movieQueueUrl, receiptHandle)
    } catch (error) {
      console.error('Erro ao processar mensagem:', error)
    }
  }

  await consumeMessages(movieQueueUrl, processMovieMessage)
}

async function handleResult(
  movie: ImportMovie,
  provider: ProvidersEnum,
  tmdbResult: ListResponse<
    MovieWithMediaType | TvSerieWithMediaType | PersonWithMediaType
  >
) {
  if (tmdbResult.total_results === 1) {
    return tmdbResult.results[0]
  }

  if (tmdbResult.total_results === 0) {
    return null
  }

  switch (provider) {
    case 'MY_ANIME_LIST':
      return await handleMyAnimeList(movie, tmdbResult)
    case 'LETTERBOXD':
      await console.log()
      break
  }
}

async function handleMyAnimeList(
  movie: ImportMovie,
  tmdbResult: ListResponse<
    MovieWithMediaType | TvSerieWithMediaType | PersonWithMediaType
  >
) {
  const metadata = movie.__metadata as MALAnimes

  console.log(metadata)

  console.log(tmdbResult)

  return 'wait'
}
