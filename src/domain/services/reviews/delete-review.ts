import { deleteReview } from '@/db/repositories/reviews-repository'
import { deleteUserActivity } from '@/db/repositories/user-activities'
import { ReviewNotFoundError } from '@/domain/errors/review-not-found-error'

export async function deleteReviewService(id: string) {
  const [review] = await deleteReview(id)

  if (!review) {
    return new ReviewNotFoundError()
  }

  await deleteUserActivity({
    activityType: 'CREATE_REVIEW',
    entityType: 'REVIEW',
    entityId: review.id,
    userId: review.userId,
  })

  return review
}
