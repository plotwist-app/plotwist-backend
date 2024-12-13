import { deleteReviewReply as deleteReviewReplyRepository } from '@/db/repositories/review-replies-repository'
import { deleteUserActivity } from '@/db/repositories/user-activities'
import { ReviewReplyNotFoundError } from '@/domain/errors/review-reply-not-found-error'

export async function deleteReviewReply(id: string) {
  const [deletedReply] = await deleteReviewReplyRepository(id)

  if (!deletedReply) {
    return new ReviewReplyNotFoundError()
  }

  await deleteUserActivity({
    activityType: 'CREATE_REPLY',
    entityType: 'REPLY',
    userId: deletedReply.userId,
    entityId: deletedReply.id,
  })

  return { reviewReply: deletedReply }
}
