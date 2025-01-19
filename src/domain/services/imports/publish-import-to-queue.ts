import type { DetailedUserImport } from '@/domain/entities/import'
import type { QueueMessage } from '@/domain/entities/queue-message'
import { config } from '@/config'
import { queueServiceFactory } from '@/factories/queue-service-factory'

export async function publishToQueue(result: DetailedUserImport) {
  processAndPublish(result.movies, config.sqsQueues.IMPORT_MOVIES_QUEUE)
  processAndPublish(result.series, config.sqsQueues.IMPORT_SERIES_QUEUE)
}

async function processAndPublish(
  items: { id: string; name: string }[],
  queueUrl: string
) {
  if (items.length === 0) return

  const queueService = queueServiceFactory('SQS')

  const parsedMessages = items.map(item => ({
    id: item.id,
    name: item.name,
  }))

  const message: QueueMessage = {
    messages: parsedMessages,
    queueUrl,
  }

  await queueService.publish(message)
}
