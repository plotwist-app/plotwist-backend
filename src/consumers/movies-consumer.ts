import type { ProvidersEnum } from '@/@types/media-type-enum'
import type { ImportMovie } from '@/domain/entities/import-movies'
import type { ListResponse } from '@plotwist_app/tmdb/dist/utils/list-response'
import type { MovieWithMediaType } from '@plotwist_app/tmdb'

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

      const tmdbId = await processMovie(movie, name, provider)

      if (!tmdbId) {
        return await failProcessing(movieQueueUrl, receiptHandle, id)
      }

      await completeProcessing(
        movieQueueUrl,
        receiptHandle,
        tmdbId,
        movie,
        userId
      )
    } catch (error) {
      console.error('Failed to process message:', error)
    }
  }

  await consumeMessages(movieQueueUrl, processMovieMessage)
}

async function processMovie(
  movie: ImportMovie,
  name: string,
  provider: ProvidersEnum
) {
  const tmdbResult = await searchTMDBMovie(name)
  return await handleResult(movie, provider, tmdbResult)
}

async function failProcessing(
  queueUrl: string,
  receiptHandle: string,
  movieId: string
) {
  await updateImportMoviesStatus(movieId, 'FAILED')
  await SqsAdapter.deleteMessage(queueUrl, receiptHandle)
}

async function completeProcessing(
  queueUrl: string,
  receiptHandle: string,
  tmdbId: number,
  movie: ImportMovie,
  userId: string
) {
  await upsertUserItemService({
    mediaType: 'MOVIE',
    status: movie.userItemStatus,
    tmdbId,
    userId,
  })

  await updateImportMoviesStatus(movie.id, 'COMPLETED')
  await SqsAdapter.deleteMessage(queueUrl, receiptHandle)
}
async function handleResult(
  movie: ImportMovie,
  provider: ProvidersEnum,
  tmdbResult: ListResponse<MovieWithMediaType>
) {
  if (tmdbResult.total_results === 0) return null

  if (tmdbResult.total_results === 1) return tmdbResult.results[0].id

  switch (provider) {
    case 'MY_ANIME_LIST':
      return await handleMyAnimeList(movie, tmdbResult)
    case 'LETTERBOXD':
      return await handleLetterboxd(movie, tmdbResult)
  }
}

async function handleMyAnimeList(
  movie: ImportMovie,
  tmdbResult: ListResponse<MovieWithMediaType>
) {
  const metadata = movie.__metadata as MALAnimes

  const { start_date } = await searchAnimeById(
    metadata.series_animedb_id.toString()
  )

  const matchedResults = tmdbResult.results.filter(
    result => result.release_date === start_date
  )

  return matchedResults.length === 1 ? matchedResults[0].id : null
}

async function handleLetterboxd(
  movie: ImportMovie,
  tmdbResult: ListResponse<MovieWithMediaType>
) {
  const metadata = movie.__metadata as {
    Date: string
    Name: string
    Year: string
    'Letterboxd URI': string
  }

  const matchedResults = tmdbResult.results.filter(result =>
    compareDate(result.release_date, metadata.Year)
  )

  return matchedResults.length === 1 ? matchedResults[0].id : null
}

function compareDate(releaseDate: string, year: string) {
  if (!releaseDate) {
    return false
  }

  if (!year) {
    return false
  }

  releaseDate.split('-')[0] === year
}
