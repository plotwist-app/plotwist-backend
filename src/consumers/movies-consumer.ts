import { config } from '@/env'
import { consumeMessages } from './consumer'
// import { getImportMovieById } from '@/domain/services/imports/get-import-movie-by-id'
import { searchTMDBMovie } from '@/domain/services/tmdb/search-tmdb-movie'
import type { ListResponse } from '@plotwist_app/tmdb/dist/utils/list-response'
import type {
  MovieWithMediaType,
  PersonWithMediaType,
  TvSerieWithMediaType,
} from '@plotwist_app/tmdb'
import { updateImportMoviesStatus } from '@/db/repositories/import-movies-repository'
import type { ProvidersEnum } from '@/@types/media-type-enum'

type ImportMovieMessage = {
  id: string
  name: string
  relaseDate: Date
  idempotencyKey: string
  provider: ProvidersEnum
}

export async function startMovieConsumer() {
  const movieQueueUrl = config.sqsQueues.IMPORT_MOVIES_QUEUE
  const processMovieMessage = async (message: string) => {
    const parsedMessage: ImportMovieMessage = JSON.parse(message)

    console.log(parsedMessage)

    // const movie = await getImportMovieById(parsedMessage.id)

    const result = await searchTMDBMovie(parsedMessage.name)

    const recoveredMovie = handleResult(result)

    console.log(recoveredMovie)

    if (!recoveredMovie) {
      updateImportMoviesStatus(parsedMessage.id, 'FAILED')
    }

    // const userImport = await getUserImportById(movie.importId)

    // recuperar o movie import
    // recuperar o user import id
    // setar o user import como processando
  }
  await consumeMessages(movieQueueUrl, processMovieMessage)
}

function handleResult(
  result: ListResponse<
    MovieWithMediaType | TvSerieWithMediaType | PersonWithMediaType
  >
) {
  if (result.total_results === 1) {
    return result.results[0]
  }
}
