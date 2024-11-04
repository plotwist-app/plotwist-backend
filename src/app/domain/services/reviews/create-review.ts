import { insertReview } from '@/db/repositories/reviews-repository'
import type { InsertReviewModel } from '../../entities/review'
import { UserNotFoundError } from '../../errors/user-not-found'
import { getUserById } from '../lists/users/get-by-id'

export async function createReview(params: InsertReviewModel) {
  const result = await getUserById(params.userId)

  if (result instanceof Error) {
    return new UserNotFoundError()
  }

  const [review] = await insertReview(params)

  return { review }
}
