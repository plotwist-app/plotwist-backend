import { describe, expect, it, vi } from 'vitest'

import { createReview } from './create-review'

import { makeRawReview } from '@/test/factories/make-review'
import { makeUser } from '@/test/factories/make-user'
import { UserNotFoundError } from '../../errors/user-not-found'
import { randomUUID } from 'node:crypto'

describe('create review', () => {
  it('should be able to create an review', async () => {
    const { id: userId } = await makeUser()

    const review = makeRawReview({ userId })

    const sut = await createReview(review)

    expect(sut).toBeTruthy()
  })

  it('should be able to fail when user id does not exists', async () => {
    const randomId = randomUUID()

    const review = makeRawReview({ userId: randomId })

    const sut = await createReview(review)

    expect(sut).toBeInstanceOf(UserNotFoundError)
  })
})
