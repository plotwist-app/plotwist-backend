import { config } from '@/env'
import { consumeMessages } from './consumer'
import { searchTMDBMovie } from '@/domain/services/tmdb/search-tmdb-movie'
import type { SQSClient } from '@aws-sdk/client-sqs'

export async function startSeriesConsumer(sqsClient: SQSClient) {
  const seriesQueueUrl = config.sqsQueues.IMPORT_SERIES_QUEUE
  const processSeriesMessage = async (
    message: string,
    receiptHandle: string
  ) => {
    const parsedMessage: { id: string; name: string } = JSON.parse(message)

    // const series = await getImportseriesById(parsedMessage.id)

    const value = await searchTMDBMovie(parsedMessage.name)

    console.log(value)

    // await deleteMessage(sqsClient, seriesQueueUrl, receiptHandle)

    // const userImport = await getUserImportById(series.importId)

    // recuperar o series import
    // recuperar o user import id
    // setar o user import como processando
  }
  await consumeMessages(seriesQueueUrl, async (messageBody: string) => {
    const parsedMessage = JSON.parse(messageBody)
    if (parsedMessage.ReceiptHandle && parsedMessage.Body) {
      await processSeriesMessage(
        parsedMessage.Body,
        parsedMessage.ReceiptHandle
      )
    }
  })
}
