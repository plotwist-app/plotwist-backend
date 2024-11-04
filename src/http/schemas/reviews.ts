import { schema } from '@/db/schema'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const createReviewRequestSchema = z.object({
  userId: z.string({ message: 'User id is required' }),
  tmdbId: z.number().nullable(),
  mediaType: z.enum(['TV_SHOW', 'MOVIE']),
  review: z.string({ message: 'Review is required' }),
  rating: z.number({ message: 'Rating is required' }),
  hasSpoilers: z.boolean().default(false),
  tmdbTitle: z.string().nullable(),
  tmdbPosterPath: z.string().nullable(),
  tmdbOverview: z.string().nullable(),
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
