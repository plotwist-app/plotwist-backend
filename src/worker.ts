import { createSqsClient, initializeSQS } from './adapters/sqs'
import { startMovieConsumer } from './consumers/movies-consumer'
import { startSeriesConsumer } from './consumers/series-cosumers'

export async function startWorkers() {
  const sqsClient = createSqsClient()

  await initializeSQS(sqsClient)

  startConsumers().catch(error => {
    console.error('Error starting consumers:', error)
    process.exit(1)
  })
}

async function startConsumers() {
  console.log('Starting consumers...')
  startMovieConsumer()
  startSeriesConsumer()
  console.log('All consumers started.')
}
