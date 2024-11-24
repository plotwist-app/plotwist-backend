import { describe, expect, it } from 'vitest'

import { createReview } from './create-review'

import { makeRawReview } from '@/test/factories/make-review'
import { makeUser } from '@/test/factories/make-user'
import { faker } from '@faker-js/faker'
import { UserNotFoundError } from '../../errors/user-not-found'

describe('create review', () => {
  it('should be able to create an review', async () => {
    const { id: userId } = await makeUser()

    const review = makeRawReview({ userId: userId })

    const sut = await createReview(review)

    expect(sut).toEqual({
      review: expect.objectContaining({
        rating: review.rating,
      }),
    })
  })

  it('should be able to fail when user id does not exists', async () => {
    const review = makeRawReview({ userId: faker.string.uuid() })
    const sut = await createReview(review)

    expect(sut).toBeInstanceOf(UserNotFoundError)
  })
})
