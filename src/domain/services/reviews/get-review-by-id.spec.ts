import { describe, expect, it, vi } from 'vitest'

import { makeUser } from '@/test/factories/make-user'
import { randomUUID } from 'node:crypto'
import { UserNotFoundError } from '../../errors/user-not-found'
import { makeReview } from '@/test/factories/make-review'
import { getReviewById } from './get-review-by-id'
import { ReviewNotFoundError } from '@/domain/errors/review-not-found-error'

describe('get review by id', () => {
  it('should be able to get an review by id', async () => {
    const { id: userId } = await makeUser()

    const { id } = await makeReview({ userId })

    const sut = await getReviewById(id)

    expect(sut).toBeTruthy()
  })

  it('should be able to fail when review id does not exists', async () => {
    const randomId = randomUUID()

    const sut = await getReviewById(randomId)

    expect(sut).toBeInstanceOf(ReviewNotFoundError)
  })
})
