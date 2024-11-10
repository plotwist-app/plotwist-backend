import { ReviewNotFoundError } from '@/domain/errors/review-not-found-error'
import type { DeleteReviewReplyModel } from '../../entities/review'
import { UserNotFoundError } from '../../errors/user-not-found'
import { getUserById } from '../users/get-by-id'
import {
  deleteReviewReply as deleteReviewReplyRepository,
  getReviewById,
} from '@/db/repositories/reviews-repository'

export async function deleteReviewReply(params: DeleteReviewReplyModel) {
  const result = await getUserById(params.userId)

  if (result instanceof Error) {
    return new UserNotFoundError()
  }

  const reviewResult = await getReviewById(params.id)

  if (reviewResult instanceof Error) {
    return new ReviewNotFoundError()
  }

  await deleteReviewReplyRepository(params)
}
