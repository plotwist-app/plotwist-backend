import { getUserById } from '@/db/repositories/user-repository'
import type { schema } from '@/db/schema'
import type { InferInsertModel } from 'drizzle-orm'
import { UserNotFound } from '../errors/user-not-found'
import { insertList } from '@/db/repositories/list-repository'

export type CreateListInput = InferInsertModel<typeof schema.lists>

export async function createList({
  title,
  description,
  visibility = 'PUBLIC',
  userId,
}: CreateListInput) {
  const [user] = await getUserById(userId)
  if (!user) {
    return new UserNotFound()
  }

  const [list] = await insertList({ title, description, visibility, userId })
  return { list }
}
