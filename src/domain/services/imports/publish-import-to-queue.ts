import { publish } from '@/adapters/sqs'
import type { DetailedUserImport } from '@/domain/entities/import'
import type { QueueMessage } from '@/domain/entities/queue-message'
import { config } from '@/config'
import { randomUUID } from 'node:crypto'

export async function publishToQueue(userImport: DetailedUserImport) {
  processAndPublish(
    userImport.movies,
    config.sqsQueues.IMPORT_MOVIES_QUEUE,
    userImport
  )
  processAndPublish(
    userImport.series,
    config.sqsQueues.IMPORT_SERIES_QUEUE,
    userImport
  )
}

async function processAndPublish(
  items: { id: string; name: string }[],
  queueUrl: string,
  { provider, userId }: DetailedUserImport
) {
  if (items.length === 0) return

  const parsedMessages = items.map(({ id, name }) => ({
    id,
    name,
    idempotencyKey: randomUUID(),
    provider,
    userId,
  }))

  const message: QueueMessage = {
    messages: parsedMessages,
    queueUrl,
  }

  await publish(message)
}
