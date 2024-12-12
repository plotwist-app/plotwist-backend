import { insertList } from '@/db/repositories/list-repository'
import type { schema } from '@/db/schema'
import type { InferInsertModel } from 'drizzle-orm'
import { UserNotFoundError } from '../../errors/user-not-found'
import postgres from 'postgres'
import { PgIntegrityConstraintViolation } from '@/db/utils/postgres-errors'
import { insertUserActivity } from '@/db/repositories/user-activities'

export type CreateListInput = InferInsertModel<typeof schema.lists>

export async function createList({
  title,
  description,
  visibility = 'PUBLIC',
  userId,
}: CreateListInput) {
  try {
    const [list] = await insertList({ title, description, visibility, userId })

    await insertUserActivity({
      activityType: 'CREATE_LIST',
      entityId: list.id,
      userId: list.userId,
      entityType: 'LIST',
    })

    return { list }
  } catch (error) {
    if (error instanceof postgres.PostgresError) {
      if (error.code === PgIntegrityConstraintViolation.ForeignKeyViolation) {
        return new UserNotFoundError()
      }
    }

    throw error
  }
}
