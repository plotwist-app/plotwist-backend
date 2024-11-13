import { describe, expect, it } from 'vitest'

import { faker } from '@faker-js/faker'
import { deleteReviewService } from './delete-review'
import { ReviewNotFoundError } from '@/domain/errors/review-not-found-error'

describe('delete review', () => {
  it('should be able to fail with invalid id', async () => {
    const sut = await deleteReviewService(faker.string.uuid())

    expect(sut).toBeInstanceOf(ReviewNotFoundError)
  })
})
