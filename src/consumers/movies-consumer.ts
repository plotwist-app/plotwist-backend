import { config } from '@/env'
import { consumeMessages } from './consumer'
// import { getImportMovieById } from '@/domain/services/imports/get-import-movie-by-id'
import { searchTMDBMovie } from '@/domain/services/tmdb/search-tmdb-movie'

export async function startMovieConsumer() {
  const movieQueueUrl = config.sqsQueues.IMPORT_MOVIES_QUEUE
  const processMovieMessage = async (message: string) => {
    const parsedMessage: { id: string; name: string } = JSON.parse(message)

    // const movie = await getImportMovieById(parsedMessage.id)

    const value = await searchTMDBMovie(parsedMessage.name)

    console.log(value)

    // const userImport = await getUserImportById(movie.importId)

    // recuperar o movie import
    // recuperar o user import id
    // setar o user import como processando
  }
  await consumeMessages(movieQueueUrl, processMovieMessage)
}
