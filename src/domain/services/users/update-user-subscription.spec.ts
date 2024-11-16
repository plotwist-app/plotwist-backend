import { makeUser } from '@/test/factories/make-user'
import { describe, expect, it } from 'vitest'

import { UserNotFoundError } from '@/domain/errors/user-not-found'
import { faker } from '@faker-js/faker'
import { updateUserSubscriptionService } from './update-user-subscription'

describe('update user subscription', () => {
  it('should be able to update user subscription type', async () => {
    const user = await makeUser()

    const sut = await updateUserSubscriptionService({
      subscriptionType: 'PRO',
      userId: user.id,
    })

    expect(sut).toEqual({
      user: expect.objectContaining({
        subscriptionType: 'PRO',
      }),
    })
  })

  it('should not be able to update user subscription with invalid userId', async () => {
    const sut = await updateUserSubscriptionService({
      subscriptionType: 'PRO',
      userId: faker.string.uuid(),
    })

    expect(sut).toBeInstanceOf(UserNotFoundError)
  })
})
