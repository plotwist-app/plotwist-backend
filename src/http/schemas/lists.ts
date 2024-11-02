import { schema } from '@/db/schema'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const createListBodySchema = createInsertSchema(schema.lists).omit({
  id: true,
  userId: true,
  createdAt: true,
  coverPath: true,
})

export const createListResponseSchema = {
  201: z
    .object({
      list: createInsertSchema(schema.lists),
    })
    .describe('List created.'),
}
