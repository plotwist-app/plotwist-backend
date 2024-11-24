import { selectReviews } from '@/db/repositories/reviews-repository'
import type { getReviewsQuerySchema } from '@/http/schemas/reviews'

export type GetReviewsServiceInput = Omit<
  typeof getReviewsQuerySchema._type,
  'tmdbId' | 'language' | 'limit'
> & {
  tmdbId?: number
  authenticatedUserId?: string
  limit?: number
}

export async function getReviewsService(input: GetReviewsServiceInput) {
  const reviews = await selectReviews(input)

  return { reviews }
}
