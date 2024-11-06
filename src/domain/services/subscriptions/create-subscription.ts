import { insertSubscription } from '@/db/repositories/subscription-repository'
import { PgIntegrityConstraintViolation } from '@/db/utils/postgres-errors'
import type { InsertSubscriptionModel } from '@/domain/entities/subscription'
import { UserNotFoundError } from '@/domain/errors/user-not-found'
import postgres from 'postgres'

export async function createSubscription(params: InsertSubscriptionModel) {
  try {
    const [subscription] = await insertSubscription(params)

    return { subscription }
  } catch (error) {
    if (error instanceof postgres.PostgresError) {
      if (error.code === PgIntegrityConstraintViolation.ForeignKeyViolation) {
        return new UserNotFoundError()
      }
    }

    throw error
  }
}
