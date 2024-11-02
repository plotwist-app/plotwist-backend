import { describe, expect, it, vi } from 'vitest'

import { createReview } from './create-review'

import { makeRawReview } from '@/test/factories/make-review'

describe('register user', () => {
  it('should be able to create an review', async () => {
    const review = makeRawReview()
    const sut = await createReview(review)

    expect(sut).toBeTruthy()
    expect(sut).toEqual({
      review: expect.objectContaining({
        email: review.language,
      }),
    })
  })
})
