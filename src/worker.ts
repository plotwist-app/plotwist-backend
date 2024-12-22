import type { SQSClient } from '@aws-sdk/client-sqs'
import { createSqsClient, initializeSQS } from './adapters/sqs'
import { startMovieConsumer } from './consumers/movies-consumer'
// import { startSeriesConsumer } from './consumers/series-cosumers'

export async function startWorkers() {
  const sqsClient = createSqsClient()

  await initializeSQS(sqsClient)

  startConsumers(sqsClient).catch(error => {
    console.error('Error starting consumers:', error)
    process.exit(1)
  })
}

async function startConsumers(sqsClient: SQSClient) {
  console.log('Starting consumers...')
  startMovieConsumer()
  // startSeriesConsumer(sqsClient)
  console.log('All consumers started.')
}
