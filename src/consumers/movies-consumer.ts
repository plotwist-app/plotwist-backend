import { config } from '@/env'
import { consumeMessages } from './consumer'

export async function startMovieConsumer() {
  const movieQueueUrl = config.sqsQueues.IMPORT_MOVIES_QUEUE
  const processMovieMessage = async (message: string): Promise<void> => {
    console.log('Processing movie message:', message)
    // Add movie-specific logic here
  }
  await consumeMessages(movieQueueUrl, processMovieMessage)
}
