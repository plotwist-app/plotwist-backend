import { db } from '@/db'
import { schema } from '@/db/schema'
import type { InferInsertModel } from 'drizzle-orm'

type CreateListInput = InferInsertModel<typeof schema.lists>

export async function createList({
  title,
  description,
  visibility = 'PUBLIC',
  userId,
}: CreateListInput) {
  const [list] = await db
    .insert(schema.lists)
    .values({
      title,
      visibility,
      description,
      userId,
    })
    .returning()

  return { list }
}
