import { describe, expect, it, beforeAll } from 'vitest'

import { makeReview } from '@/test/factories/make-review'
import { makeUser } from '@/test/factories/make-user'
import { makeLike } from '@/test/factories/make-like'

import type { User } from '@/domain/entities/user'
import { getLikesService } from './get-likes'

let user: User

describe('get likes', () => {
  beforeAll(async () => {
    user = await makeUser()
  })

  it('should be able to get likes with user information', async () => {
    const review = await makeReview({ userId: user.id })

    await makeLike({
      entityType: 'REVIEW',
      userId: user.id,
      entityId: review.id,
    })

    const sut = await getLikesService(review.id)

    expect(sut).toEqual({
      likes: expect.objectContaining(
        expect.objectContaining({
          entityId: review.id,
          entityType: 'REVIEW',
          user: {
            id: user.id,
            username: user.username,
            imagePath: user.imagePath,
            subscriptionType: user.subscriptionType,
          },
        })
      ),
    })
  })
})
