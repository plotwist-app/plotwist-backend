import { selectReviews } from '@/db/repositories/reviews-repository'
import type { getDetailedReviewsQuerySchema } from '@/http/schemas/reviews'

export type GetDetailedReviewsInput = typeof getDetailedReviewsQuerySchema._type

export async function getDetailedReviewsService({
  userId,
  language,
  limit,
}: GetDetailedReviewsInput) {
  const reviews = await selectReviews({ userId, language, limit })

  return { reviews }
}
