import { publish } from '@/adapters/sqs'
import { insertUserImport } from '@/db/repositories/user-import-repository'
import { PgIntegrityConstraintViolation } from '@/db/utils/postgres-errors'
import type { InsertUserImportWithItems } from '@/domain/entities/import'
import type { QueueMessage } from '@/domain/entities/queue-message'

import { FailedToInsertUserImport } from '@/domain/errors/failed-to-import-user-items'
import { UserNotFoundError } from '@/domain/errors/user-not-found'
import { config } from '@/env'
import postgres from 'postgres'

export async function createUserImport(params: InsertUserImportWithItems) {
  try {
    const result = await insertUserImport(params)

    processAndPublish(result.movies, config.sqsQueues.importMoviesQueue)
    processAndPublish(result.series, config.sqsQueues.importSeriesQueue)

    return result
  } catch (error) {
    if (error instanceof postgres.PostgresError) {
      if (error.code === PgIntegrityConstraintViolation.ForeignKeyViolation) {
        return new UserNotFoundError()
      }

      return new FailedToInsertUserImport()
    }
  }
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
