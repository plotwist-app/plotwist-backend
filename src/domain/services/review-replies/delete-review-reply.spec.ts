import { describe, expect, it } from 'vitest'

import { randomUUID } from 'node:crypto'
import { UserNotFoundError } from '@/domain/errors/user-not-found'
import { makeReview } from '@/test/factories/make-review'
import { makeReviewReply } from '@/test/factories/make-review-reply'
import { makeUser } from '@/test/factories/make-user'
import { deleteReviewReply } from './delete-review-reply'

describe('delete review reply', () => {
  it('should be able to delete a review reply', async () => {
    const { id: userId } = await makeUser()

    const review = await makeReview({ userId })
    const reviewReply = await makeReviewReply({
      userId,
      reviewId: review.id,
    })

    const sut = await deleteReviewReply({
      id: reviewReply.id,
      userId,
      reviewId: review.id,
    })

    expect(sut).toBeUndefined()
  })

  it('should be able to fail when user id does not exists', async () => {
    const { id: userId } = await makeUser()

    const review = await makeReview({ userId })
    const reviewReply = await makeReviewReply({
      userId,
      reviewId: review.id,
    })

    const sut = await deleteReviewReply({
      id: reviewReply.id,
      userId: randomUUID(),
      reviewId: review.id,
    })

    expect(sut).toBeInstanceOf(UserNotFoundError)
  })
})
