import { insertReviewReply } from '@/db/repositories/reviews-repository'
import type { InsertReviewReplyModel } from '../../entities/review'
import { UserNotFoundError } from '../../errors/user-not-found'
import { getUserById } from '../users/get-by-id'
import { ReviewNotFoundError } from '@/domain/errors/review-not-found-error'

export async function createReviewReply(params: InsertReviewReplyModel) {
  const result = await getUserById(params.userId)

  if (result instanceof Error) {
    return new UserNotFoundError()
  }

  const reviewReply = await insertReviewReply(params)

  if (!reviewReply) {
    return new ReviewNotFoundError()
  }

  return { reviewReply }
}
