import type { ProvidersEnum } from '@/@types/media-type-enum'
import { publish } from '@/adapters/sqs'
import type { DetailedUserImport } from '@/domain/entities/import'
import type { QueueMessage } from '@/domain/entities/queue-message'
import { config } from '@/env'
import { randomUUID } from 'node:crypto'

export async function publishToQueue(result: DetailedUserImport) {
  processAndPublish(
    result.movies,
    config.sqsQueues.IMPORT_MOVIES_QUEUE,
    result.provider
  )
  processAndPublish(
    result.series,
    config.sqsQueues.IMPORT_SERIES_QUEUE,
    result.provider
  )
}

async function processAndPublish(
  items: { id: string; name: string }[],
  queueUrl: string,
  provider: ProvidersEnum
) {
  if (items.length === 0) return

  const parsedMessages = items.map(({ id, name }) => ({
    id,
    name,
    idempotencyKey: randomUUID(),
    provider,
  }))

  const message: QueueMessage = {
    messages: parsedMessages,
    queueUrl,
  }

  await publish(message)
}
