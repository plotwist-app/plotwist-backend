import { describe, expect, it, vi } from 'vitest'

import { createSubscription } from './create-subscription'
import { makeUser } from '@/test/factories/make-user'
import { faker } from '@faker-js/faker'
import { UserNotFoundError } from '@/domain/errors/user-not-found'

describe('create subscription', () => {
  it('should be able to create subscription', async () => {
    const user = await makeUser()
    const sut = await createSubscription({ type: 'PRO', userId: user.id })

    expect(sut).toEqual({
      subscription: expect.objectContaining({
        userId: user.id,
      }),
    })
  })

  it('should not be able to create subscription with invalid user id', async () => {
    const sut = await createSubscription({
      type: 'PRO',
      userId: faker.string.uuid(),
    })

    expect(sut).toBeInstanceOf(UserNotFoundError)
  })
})
