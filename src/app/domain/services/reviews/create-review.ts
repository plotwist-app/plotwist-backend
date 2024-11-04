import { insertReview } from '@/db/repositories/reviews-repository'
import type { Review, InsertReviewModel } from '../../entities/review'
import { UserNotFoundError } from '../../errors/user-not-found'
import { getUserById } from '../users/get-by-id'

export async function createReview(
  params: InsertReviewModel
): Promise<Review | UserNotFoundError | undefined> {
  const user = await getUserById(params.userId)

  if (user instanceof Error) {
    return new UserNotFoundError()
  }

  const [review] = await insertReview(params)

  return review
}
