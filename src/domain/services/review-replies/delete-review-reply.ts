import { ReviewNotFoundError } from '@/domain/errors/review-not-found-error'
import { UserNotFoundError } from '../../errors/user-not-found'
import { getUserById } from '../users/get-by-id'
import { getReviewById } from '../reviews/get-review-by-id'
import type { DeleteReviewReplyModel } from '@/domain/entities/review-reply'
import {
  deleteReviewReply as deleteReviewReplyRepository,
  getReviewReplyById,
} from '@/db/repositories/review-replies-repository'
import { ReviewReplyNotFoundError } from '@/domain/errors/review-reply-not-found-error'

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
