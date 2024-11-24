import { schema } from '@/db/schema'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const createLikeBodySchema = createInsertSchema(schema.likes).pick({
  entityId: true,
  entityType: true,
})

export const createLikeResponseSchema = {
  201: z.object({
    like: createSelectSchema(schema.likes),
  }),
}

export const deleteLikeParamsSchema = z.object({
  id: z.string(),
})
