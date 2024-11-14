import type { UpdateReviewReplyModel } from '@/domain/entities/review-reply'
import { UserNotFoundError } from '../../errors/user-not-found'
import { getUserById } from '../users/get-by-id'
import { ReviewNotFoundError } from '@/domain/errors/review-not-found-error'
import {
  getReviewReplyById,
  updateReviewReply as updateReviewReplyRepository,
} from '@/db/repositories/review-replies-repository'
import { getReviewById } from '../reviews/get-review-by-id'
import { ReviewReplyNotFoundError } from '@/domain/errors/review-reply-not-found-error'

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
