import { schema } from '@/db/schema'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { languageQuerySchema, paginationQuerySchema } from './common'

export const upsertUserItemBodySchema = createInsertSchema(
  schema.userItems
).pick({ tmdbId: true, mediaType: true, status: true })

export const upsertUserItemResponseSchema = {
  201: z.object({
    userItem: createSelectSchema(schema.userItems).extend({
      addedAt: z.string(),
      updatedAt: z.string(),
    }),
  }),
}

export const getUserItemsQuerySchema = createInsertSchema(schema.userItems)
  .pick({ status: true, userId: true })
  .merge(languageQuerySchema)
  .merge(paginationQuerySchema)

export const getUserItemsResponseSchema = {
  200: z.object({
    userItems: z.array(
      createSelectSchema(schema.userItems).extend({
        title: z.string(),
        posterPath: z.string().nullable(),
        backdropPath: z.string().nullable(),
      })
    ),
    nextCursor: z.string().nullable(),
  }),
}

export const deleteUserItemParamsSchema = z.object({
  id: z.string(),
})

export const getUserItemQuerySchema = createSelectSchema(schema.userItems)
  .pick({
    mediaType: true,
  })
  .extend({ tmdbId: z.string() })

export const getUserItemResponseSchema = {
  200: z.object({
    userItem: createSelectSchema(schema.userItems).optional(),
  }),
}

export const getAllUserItemsQuerySchema = createInsertSchema(
  schema.userItems
).pick({ status: true, userId: true })

export const getAllUserItemsResponseSchema = {
  200: z.object({
    userItems: z.array(
      createSelectSchema(schema.userItems).pick({
        id: true,
        mediaType: true,
        tmdbId: true,
      })
    ),
  }),
}
