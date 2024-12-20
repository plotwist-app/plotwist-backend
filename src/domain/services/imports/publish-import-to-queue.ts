import { publish } from '@/adapters/sqs'
import type { DetailedUserImport } from '@/domain/entities/import'
import type { QueueMessage } from '@/domain/entities/queue-message'
import { config } from '@/env'

export function publishToQueue(result: DetailedUserImport) {
  processAndPublish(result.movies, config.sqsQueues.importMoviesQueue)
  processAndPublish(result.series, config.sqsQueues.importSeriesQueue)
}

const processAndPublish = (
  items: { id: string; name: string }[],
  queueUrl: string
) => {
  if (items.length === 0) return

  const parsedMessages = items.map(item => ({
    id: item.id,
    name: item.name,
  }))

  const message: QueueMessage = {
    messages: parsedMessages,
    queueUrl,
  }

  publish(message)
}
