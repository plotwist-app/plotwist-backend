import { upsertUserItem } from '@/db/repositories/user-item-repository'
import { PgIntegrityConstraintViolation } from '@/db/utils/postgres-errors'
import type { InsertUserItem, UserItem } from '@/domain/entities/user-item'
import { UserNotFoundError } from '@/domain/errors/user-not-found'
import postgres from 'postgres'
import * as changeKeys from 'change-case/keys'

export async function upsertUserItemService(values: InsertUserItem) {
  try {
    const [userItem] = await upsertUserItem(values)

    return { userItem: changeKeys.camelCase(userItem) }
  } catch (error) {
    if (error instanceof postgres.PostgresError) {
      if (error.code === PgIntegrityConstraintViolation.ForeignKeyViolation) {
        return new UserNotFoundError()
      }
    }

    throw error
  }
}
