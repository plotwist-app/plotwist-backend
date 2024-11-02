import { insertReview } from '@/db/repositories/reviews-repository'

import { PgIntegrityConstraintViolation } from '@/db/utils/postgres-errors'
import postgres from 'postgres'
import type { Review, InsertReviewModel } from '../../entities/review'

export async function createReview(
  params: InsertReviewModel
): Promise<Review | undefined> {
  try {
    const [review] = await insertReview(params)

    return review
  } catch (error: unknown) {
    handleError(error)
  }
}

function handleError(error: unknown) {
  console.log(error)

  throw error
}
