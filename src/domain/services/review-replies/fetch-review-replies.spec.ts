import { randomUUID } from 'node:crypto'
import type { FetchReviewRepliesModel } from '@/domain/entities/review-reply'
import { makeReview } from '@/test/factories/make-review'
import { makeReviewReply } from '@/test/factories/make-review-reply'
import { makeUser } from '@/test/factories/make-user'
import { fetchReviewReplies } from './fetch-review-replies'

describe('fetchReviewReplies', () => {
  it('should return review replies for a given reviewId', async () => {
    const user = await makeUser()
    const review = await makeReview({ userId: user.id })

    const params: FetchReviewRepliesModel = { reviewId: review.id, page: 1 }

    const reviewReplies = await Promise.all(
      Array.from({ length: 11 }, () =>
        makeReviewReply({ reviewId: review.id, userId: user.id })
      )
    )

    const result = await fetchReviewReplies(params)

    expect(result).toHaveProperty('reviewReplies')
    expect(result.reviewReplies).toHaveLength(10)

    const resultReviewReplies = reviewReplies.map(reply =>
      result.reviewReplies.find(resultReply => resultReply.id === reply.id)
    )

    expect(resultReviewReplies).toEqual(
      expect.arrayContaining(resultReviewReplies)
    )
  })

  it('should return the correct number of replies for a given page', async () => {
    const user = await makeUser()
    const review = await makeReview({ userId: user.id })

    const params: FetchReviewRepliesModel = { reviewId: review.id, page: 2 }

    const reviewReplies = await Promise.all(
      Array.from({ length: 11 }, () =>
        makeReviewReply({ reviewId: review.id, userId: user.id })
      )
    )

    const result = await fetchReviewReplies(params)

    expect(result).toHaveProperty('reviewReplies')
    expect(result.reviewReplies).toHaveLength(1)

    const resultReviewReplies = reviewReplies.map(reply =>
      result.reviewReplies.find(resultReply => resultReply.id === reply.id)
    )

    expect(resultReviewReplies).toEqual(
      expect.arrayContaining(resultReviewReplies)
    )
  })

  it('should handle empty replies', async () => {
    const params: FetchReviewRepliesModel = {
      reviewId: randomUUID(),
      page: 1,
    }
    const result = await fetchReviewReplies(params)

    expect(result).toHaveProperty('reviewReplies')
    expect(result.reviewReplies).toEqual([])
  })
})
