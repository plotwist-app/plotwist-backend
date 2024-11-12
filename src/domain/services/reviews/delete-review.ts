import { deleteReview } from '@/db/repositories/reviews-repository'

export async function deleteReviewService(id: string) {
  return await deleteReview(id)
}
