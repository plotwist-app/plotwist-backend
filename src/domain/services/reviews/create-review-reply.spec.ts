import { makeRawReview, makeReview } from '@/test/factories/make-review'
import { makeUser } from '@/test/factories/make-user'
import { describe } from 'vitest'
import { createReviewReply } from './create-review-reply'
import { faker } from '@faker-js/faker'

describe('create review reply', () => {
  it('should be able to create a review reply', async () => {
    const { id: userId } = await makeUser()

    const review = await makeReview({userId})
    const reply = faker.lorem.sentence()

    const sut = await createReviewReply({
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
})
