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
import { searchAnimeById } from '@/adapters/my-anime-list'
import { upsertUserItemService } from '@/domain/services/user-items/upsert-user-item'

type ImportMovieMessage = {
  id: string
  name: string
  idempotencyKey: string
  provider: ProvidersEnum
  userId: string
}
export async function startMovieConsumer() {
  const movieQueueUrl = config.sqsQueues.IMPORT_MOVIES_QUEUE
  const processMovieMessage = async (
    message: string,
    receiptHandle: string
  ) => {
    try {
      const { id, name, provider, userId }: ImportMovieMessage =
        JSON.parse(message)

      const movie = await getImportMovieById(id)

      const tmdbResult = await searchTMDBMovie(name)

      const tmdbId = await handleResult(movie, provider, tmdbResult)

      if (!tmdbId) {
        await updateImportMoviesStatus(id, 'FAILED')

        return await SqsAdapter.deleteMessage(movieQueueUrl, receiptHandle)
      }

      await upsertUserItemService({
        mediaType: 'MOVIE',
        status: movie.userItemStatus,
        tmdbId: tmdbId,
        userId,
      })

      await updateImportMoviesStatus(id, 'COMPLETED')

      return await SqsAdapter.deleteMessage(movieQueueUrl, receiptHandle)
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
  if (tmdbResult.total_results === 0) {
    return null
  }

  if (tmdbResult.total_results === 1) {
    return tmdbResult.results[0].id
  }

  switch (provider) {
    case 'MY_ANIME_LIST':
      return await handleMyAnimeList(movie, tmdbResult)
    case 'LETTERBOXD':
      return await handleMyAnimeList(movie, tmdbResult)
  }
}

async function handleMyAnimeList(
  movie: ImportMovie,
  tmdbResult: ListResponse<
    MovieWithMediaType | TvSerieWithMediaType | PersonWithMediaType
  >
) {
  const metadata = movie.__metadata as MALAnimes

  const { start_date } = await searchAnimeById(
    metadata.series_animedb_id.toString()
  )

  const filter = tmdbResult.results.filter(
    result => result.release_date === start_date
  )

  if (filter.length === 0) {
    return null
  }

  if (filter.length === 1) {
    return filter[0].id
  }

  return null
}
