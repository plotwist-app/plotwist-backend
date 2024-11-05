import { getUserById } from '@/db/repositories/user-repository'
import type { schema } from '@/db/schema'
import type { InferInsertModel } from 'drizzle-orm'
import { insertList } from '@/db/repositories/list-repository'
import { UserNotFoundError } from '../../errors/user-not-found'

export type CreateListInput = InferInsertModel<typeof schema.lists>

export async function createList({
  title,
  description,
  visibility = 'PUBLIC',
  userId,
}: CreateListInput) {
  const [user] = await getUserById(userId)

  if (!user) {
    return new UserNotFoundError()
  }

  const [list] = await insertList({ title, description, visibility, userId })
  return { list }
}
