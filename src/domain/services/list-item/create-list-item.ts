import { insertListItem } from '@/db/repositories/list-item-repository'
import { PgIntegrityConstraintViolation } from '@/db/utils/postgres-errors'
import postgres from 'postgres'
import type { InsertListItem } from '../../entities/list-item'
import { ListNotFoundError } from '../../errors/list-not-found-error'
import { insertUserActivity } from '@/db/repositories/user-activities'

export async function createListItemService(
  values: InsertListItem,
  userId: string
) {
  try {
    const [listItem] = await insertListItem(values)

    insertUserActivity({
      activityType: 'ADD_ITEM',
      userId,
      entityId: listItem.listId,
      entityType: 'LIST',
      metadata: {
        tmdbId: listItem.tmdbId,
        mediaType: listItem.mediaType,
      },
    })

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
