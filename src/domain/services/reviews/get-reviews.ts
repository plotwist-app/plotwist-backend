import { selectReviews } from '@/db/repositories/reviews-repository'
import type { getReviewsQuerySchema } from '@/http/schemas/reviews'

export type GetReviewsServiceInput = Omit<
  typeof getReviewsQuerySchema._type,
  'tmdbId'
> & {
  tmdbId: number
}

export async function getReviewsService({
  language,
  mediaType,
  tmdbId,
}: GetReviewsServiceInput) {
  const reviews = await selectReviews({
    language,
    mediaType,
    tmdbId,
  })

  return { reviews }
}
