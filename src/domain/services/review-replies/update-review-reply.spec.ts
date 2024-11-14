import { describe, expect, it } from 'vitest'

import { makeReview } from '@/test/factories/make-review'
import { makeUser } from '@/test/factories/make-user'
import { faker } from '@faker-js/faker'
import { createReviewReply } from './create-review-reply'
import { randomUUID } from 'node:crypto'
import { UserNotFoundError } from '@/domain/errors/user-not-found'
import { ReviewReplyNotFoundError } from '@/domain/errors/review-reply-not-found-error'
import { makeReviewReply } from '@/test/factories/make-review-reply'
import { updateReviewReply } from './update-review-reply'

describe('update review reply', () => {
  it('should be able to update a review reply', async () => {
    const { id: userId } = await makeUser()

    const review = await makeReview({ userId })
    const oldReply = await makeReviewReply({ reviewId: review.id, userId })

    const reply = faker.lorem.sentence()

    const sut = await updateReviewReply({
      id: oldReply.id,
      userId,
      reviewId: review.id,
      reply,
    })

    expect(sut).toEqual({
      reviewReply: expect.objectContaining({
        reply,
      }),
    })
  })

  it('should be able to fail when user id does not exists', async () => {
    const { id: userId } = await makeUser()

    const review = await makeReview({ userId })
    const reply = faker.lorem.sentence()

    const sut = await createReviewReply({
      userId: randomUUID(),
      reviewId: review.id,
      reply,
    })

    expect(sut).toBeInstanceOf(UserNotFoundError)
  })
})
