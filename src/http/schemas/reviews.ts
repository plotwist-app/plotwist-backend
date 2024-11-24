import { schema } from '@/db/schema'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { languageQuerySchema } from './common'

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
      likeCount: z.number(),
      userLike: z
        .object({
          id: z.string(),
          entityId: z.string(),
          userId: z.string(),
          createdAt: z.string(),
        })
        .nullable(),
    })
  ),
}

export const reviewParamsSchema = z.object({
  id: z.string(),
})

export const updateReviewBodySchema = createInsertSchema(schema.reviews).pick({
  rating: true,
  review: true,
  hasSpoilers: true,
})

export const updateReviewResponse = {
  200: createSelectSchema(schema.reviews),
}

export const getDetailedReviewsQuerySchema = z
  .object({
    userId: z.string().optional(),
    limit: z.string().optional(),
  })
  .merge(languageQuerySchema)

export const getDetailedReviewsResponseSchema = {
  200: z.object({
    reviews: z.array(
      createSelectSchema(schema.reviews).extend({
        user: createSelectSchema(schema.users).pick({
          username: true,
          id: true,
          imagePath: true,
        }),
        title: z.string(),
        posterPath: z.string().nullable(),
        backdropPath: z.string().nullable(),
      })
    ),
  }),
}
