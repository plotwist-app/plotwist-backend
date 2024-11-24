import { selectReviewsWithUser } from '@/db/repositories/reviews-repository'
import type { getReviewsQuerySchema } from '@/http/schemas/reviews'

export type GetReviewsServiceInput = Omit<
  typeof getReviewsQuerySchema._type,
  'tmdbId'
> & {
  tmdbId: number
  authenticatedUserId?: string
}

export async function getReviewsService({
  language,
  mediaType,
  tmdbId,
  authenticatedUserId,
}: GetReviewsServiceInput) {
  const reviews = await selectReviewsWithUser({
    language,
    mediaType,
    tmdbId,
    authenticatedUserId,
  })

  return { reviews }
}
