import {
  getReviewReplyById,
  updateReviewReply as updateReviewReplyRepository,
} from '@/db/repositories/review-replies-repository'
import type { UpdateReviewReplyModel } from '@/domain/entities/review-reply'
import { ReviewNotFoundError } from '@/domain/errors/review-not-found-error'
import { ReviewReplyNotFoundError } from '@/domain/errors/review-reply-not-found-error'
import { UserNotFoundError } from '../../errors/user-not-found'
import { getReviewById } from '../reviews/get-review-by-id'
import { getUserById } from '../users/get-by-id'

export async function updateReviewReply(params: UpdateReviewReplyModel) {
  const result = await getUserById(params.userId)

  if (result instanceof Error) {
    return new UserNotFoundError()
  }

  const reviewResult = await getReviewById(params.reviewId)

  if (reviewResult instanceof Error) {
    return new ReviewNotFoundError()
  }

  const [oldReviewReply] = await getReviewReplyById(params.id)

  if (!oldReviewReply) {
    return new ReviewReplyNotFoundError()
  }

  const [reviewReply] = await updateReviewReplyRepository(params)

  if (!reviewReply) {
    return new ReviewNotFoundError()
  }

  return { reviewReply }
}
