import { describe, expect, it, vi } from 'vitest'

import { makeUser } from '@/test/factories/make-user'
import { completeSubscription } from './complete-subscription'

describe('complete subscription', () => {
  it('should be able to complete subscription', async () => {
    const user = await makeUser()
    const sut = await completeSubscription(user.email)

    expect(sut).toEqual({
      user: expect.objectContaining({
        subscriptionType: 'PRO',
      }),
    })
  })
})
