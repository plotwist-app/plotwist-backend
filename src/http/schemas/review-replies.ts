import { schema } from '@/db/schema'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const createReviewReplyBodySchema = createInsertSchema(
  schema.reviewReplies
).omit({
  id: true,
  userId: true,
  createdAt: true,
})

export const createReviewReplyResponseSchema = {
  201: z
    .object({
      reviewReply: createSelectSchema(schema.reviewReplies),
    })
    .describe('Review reply created.'),
  404: z
    .object({
      message: z.string(),
    })
    .describe('Review or user not found'),
}

export const reviewReplyParamsSchema = z.object({
  id: z.string(),
})

export const updateReviewReplyBodySchema = createInsertSchema(
  schema.reviewReplies
).pick({
  reply: true,
})

export const updateReviewReplyResponseSchema = {
  200: z.object({
    reviewReply: createSelectSchema(schema.reviewReplies),
  }),
}

export const updateReviewReplyParamsSchema = z.object({
  reviewId: z.string(),
})

export const getReviewRepliesQuerySchema = z.object({
  reviewId: z.string(),
  page: z.number().min(1).default(1),
})

export const getReviewRepliesResponseSchema = {
  200: z.array(
    createSelectSchema(schema.reviewReplies).extend({
      user: createSelectSchema(schema.users).pick({
        id: true,
        username: true,
        imagePath: true,
      }),
    })
  ),
}

export const fetchReviewRepliesQuerySchema = z.object({
  reviewId: z.string(),
  page: z.number().min(1).default(1),
})

export const deleteReviewReplyParamsSchema = z.object({
  reviewId: z.string(),
})
