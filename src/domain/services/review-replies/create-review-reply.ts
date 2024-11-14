import type { InsertReviewReplyModel } from '@/domain/entities/review-reply'
import { UserNotFoundError } from '../../errors/user-not-found'
import { getUserById } from '../users/get-by-id'
import { ReviewNotFoundError } from '@/domain/errors/review-not-found-error'
import { insertReviewReply } from '@/db/repositories/review-replies-repository'
import { getReviewById } from '../reviews/get-review-by-id'

export async function createReviewReply(params: InsertReviewReplyModel) {
  const result = await getUserById(params.userId)

  if (result instanceof Error) {
    return new UserNotFoundError()
  }

  const reviewResult = await getReviewById(params.reviewId)

  if (reviewResult instanceof Error) {
    return new ReviewNotFoundError()
  }

  const [reviewReply] = await insertReviewReply(params)

  if (!reviewReply) {
    return new ReviewNotFoundError()
  }

  return { reviewReply }
}
