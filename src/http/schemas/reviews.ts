import { schema } from '@/db/schema'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const createReviewBodySchema = createInsertSchema(schema.reviews).omit({
  userId: true,
  id: true,
  createdAt: true,
})

export const createReviewResponseSchema = {
  201: z
    .object({
      review: createInsertSchema(schema.reviews),
    })
    .describe('Review created.'),
  404: z
    .object({
      message: z.string(),
    })
    .describe('User not found'),
}

export const getReviewsQuerySchema = createSelectSchema(schema.reviews)
  .pick({
    mediaType: true,
    language: true,
  })
  .extend({
    tmdbId: z.string(),
  })

export const getReviewsResponseSchema = {
  200: z.array(
    createSelectSchema(schema.reviews).extend({
      user: createSelectSchema(schema.users).pick({
        id: true,
        username: true,
        imagePath: true,
      }),
    })
  ),
}

export const deleteReviewByIdParamsSchema = z.object({
  id: z.string(),
})
