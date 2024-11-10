import { schema } from '@/db/schema'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const createReviewRequestSchema = z.object({
  userId: z.string({ message: 'User id is required' }),
  tmdbId: z.number().optional(),
  mediaType: z.enum(['TV_SHOW', 'MOVIE']),
  review: z.string({ message: 'Review is required' }),
  rating: z.number({ message: 'Rating is required' }),
  hasSpoilers: z.boolean().default(false),
  tmdbTitle: z.string().optional(),
  tmdbPosterPath: z.string().optional(),
  tmdbOverview: z.string().optional(),
  language: z.enum([
    'en-US',
    'es-ES',
    'fr-FR',
    'it-IT',
    'de-DE',
    'pt-BR',
    'ja-JP',
  ]),
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

export const createReviewReplyRequestSchema = z.object({
  userId: z.string({ message: 'User id is required' }),
  reviewId: z.string({ message: 'Review id is required' }),
  reply: z.string({ message: 'Reply is required' }),
})

export const createReviewReplyResponseSchema = {
  201: z
    .object({
      reviewReply: createInsertSchema(schema.reviewReplies),
    })
    .describe('Review reply created.'),
  404: z
    .object({
      message: z.string(),
    })
    .describe('Review not found'),
}
