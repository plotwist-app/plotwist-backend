import { schema } from '@/db/schema'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { languageQuerySchema } from './common'

export const createUserItemBodySchema = createInsertSchema(
  schema.userItems
).pick({ tmdbId: true, mediaType: true, status: true })

export const getUserItemsQuerySchema = createInsertSchema(schema.userItems)
  .pick({ status: true })
  .merge(languageQuerySchema)

export const getUserItemsResponseSchema = {
  200: z.array(
    createSelectSchema(schema.userItems).extend({
      title: z.string(),
      posterPath: z.string().nullable(),
      backdropPath: z.string().nullable(),
    })
  ),
}

export const deleteUserItemParamsSchema = z.object({
  id: z.string(),
})
