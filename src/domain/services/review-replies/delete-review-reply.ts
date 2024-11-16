import {
  deleteReviewReply as deleteReviewReplyRepository,
  getReviewReplyById,
} from '@/db/repositories/review-replies-repository'
import type { DeleteReviewReplyModel } from '@/domain/entities/review-reply'
import { ReviewNotFoundError } from '@/domain/errors/review-not-found-error'
import { ReviewReplyNotFoundError } from '@/domain/errors/review-reply-not-found-error'
import { UserNotFoundError } from '../../errors/user-not-found'
import { getReviewById } from '../reviews/get-review-by-id'
import { getUserById } from '../users/get-by-id'

export async function deleteReviewReply(params: DeleteReviewReplyModel) {
  const result = await getUserById(params.userId)

  if (result instanceof Error) {
    return new UserNotFoundError()
  }

  const reviewResult = await getReviewById(params.reviewId)

  if (reviewResult instanceof Error) {
    return new ReviewNotFoundError()
  }

  const [reviewReply] = await getReviewReplyById(params.id)

  if (!reviewReply) {
    return new ReviewReplyNotFoundError()
  }

  await deleteReviewReplyRepository(params)
}
