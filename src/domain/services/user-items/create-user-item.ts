import { insertUserItem } from '@/db/repositories/user-item-repository'
import { PgIntegrityConstraintViolation } from '@/db/utils/postgres-errors'
import type { InsertUserItem } from '@/domain/entities/user-item'
import { UserNotFoundError } from '@/domain/errors/user-not-found'
import postgres from 'postgres'

export async function createUserItemService(values: InsertUserItem) {
  try {
    const [userItem] = await insertUserItem(values)

    return { userItem }
  } catch (error) {
    if (error instanceof postgres.PostgresError) {
      if (error.code === PgIntegrityConstraintViolation.ForeignKeyViolation) {
        return new UserNotFoundError()
      }
    }

    throw error
  }
}
