import { insertReview } from '@/db/repositories/reviews-repository'
import type { InsertReviewModel } from '../../entities/review'

export async function createReview(params: InsertReviewModel) {
  const [review] = await insertReview(params)
  return { review }
}
