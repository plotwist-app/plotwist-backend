import { config } from '@/env'
import { consumeMessages } from './consumer'

export async function startSeriesConsumer() {
  const seriesQueueUrl = config.sqsQueues.IMPORT_SERIES_QUEUE
  const processSeriesMessage = async (message: string) => {
    console.log('Processing series message:', message)
    // Add series-specific logic here
  }

  await consumeMessages(seriesQueueUrl, processSeriesMessage)
}
