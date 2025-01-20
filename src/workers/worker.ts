import { initializeSQS } from '@/adapters/sqs'
import { createSqsClient } from '@/adapters/sqs'
import { config } from '@/config'
import { startMovieConsumer } from '@/workers/consumers/movies-consumer'
import { startSeriesConsumer } from '@/workers/consumers/series-cosumer'

export async function startWorkers() {
  startSQS()
}

async function startConsumers() {
  if (config.featureFlags.ENABLE_IMPORT_MOVIES === 'true') {
    startMovieConsumer()
  }

  if (config.featureFlags.ENABLE_IMPORT_SERIES === 'true') {
    startSeriesConsumer()
  }
}

async function startSQS() {
  if (config.featureFlags.ENABLE_SQS === 'true') {
    const sqsClient = createSqsClient()
    await initializeSQS(sqsClient)

    startConsumers().catch(error => {
      console.error('Error starting consumers:', error)
      process.exit(1)
    })
  }
}
