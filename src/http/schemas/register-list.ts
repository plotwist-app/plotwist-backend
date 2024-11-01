import { schema } from '@/db/schema'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const registerListBodySchema = createInsertSchema(schema.lists).omit({
  id: true,
  userId: true,
  createdAt: true,
  coverPath: true,
})

export const registerListResponseSchema = {
  200: z.object({
    list: createInsertSchema(schema.lists),
  }),
}
