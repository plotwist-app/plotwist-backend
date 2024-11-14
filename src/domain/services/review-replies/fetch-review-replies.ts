import { getReviewReplies as getReviewRepliesRepository } from '@/db/repositories/review-replies-repository'
import type { FetchReviewRepliesModel } from '@/domain/entities/review-reply'

export async function fetchReviewReplies(params: FetchReviewRepliesModel) {
  const reviewReplies = await getReviewRepliesRepository(params)

  return { reviewReplies }
}
