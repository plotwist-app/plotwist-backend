import { db } from '@/db'
import { schema } from '@/db/schema'
import { createInsertSchema } from 'drizzle-zod'

const createListInput = createInsertSchema(schema.lists).pick({
  title: true,
  description: true,
  visibility: true,
  userId: true,
})._type

type CreateListInput = typeof createListInput

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
