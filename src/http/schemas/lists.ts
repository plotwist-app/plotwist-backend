import { schema } from '@/db/schema'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
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
      list: createSelectSchema(schema.lists),
    })
    .describe('List created.'),
}

export const getListsQuerySchema = z.object({
  userId: z.string().optional(),
})

export const getListsResponseSchema = {
  200: z.object({
    lists: z.array(
      createSelectSchema(schema.lists).extend({ likes: z.number() })
    ),
  }),
}
