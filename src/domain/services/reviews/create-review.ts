import { insertReview } from '@/db/repositories/reviews-repository'
import type { InsertReviewModel } from '../../entities/review'
import { UserNotFoundError } from '@/domain/errors/user-not-found'

export async function createReview(params: InsertReviewModel) {
  const [review] = await insertReview(params)
  return { review }
}
