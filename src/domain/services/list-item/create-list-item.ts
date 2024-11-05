import { insertListItem } from '@/db/repositories/list-item-repository'
import type { InsertListItem } from '../../entities/list-item'
import { ListNotFoundError } from '../../errors/list-not-found-error'
import postgres from 'postgres'
import { PgIntegrityConstraintViolation } from '@/db/utils/postgres-errors'

export async function createListItemService(values: InsertListItem) {
  try {
    const [listItem] = await insertListItem(values)
    return { listItem }
  } catch (error) {
    if (error instanceof postgres.PostgresError) {
      if (error.code === PgIntegrityConstraintViolation.ForeignKeyViolation) {
        return new ListNotFoundError()
      }
    }

    throw error
  }
}
