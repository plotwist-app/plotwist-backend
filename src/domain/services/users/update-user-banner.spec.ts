import { describe, expect, it } from 'vitest'
import { makeUser } from '@/test/factories/make-user'

import { faker } from '@faker-js/faker'
import { UserNotFoundError } from '@/domain/errors/user-not-found'
import { updateUserBannerService } from './update-user-banner'

describe('update username banner', () => {
  it('should be able to update user banner', async () => {
    const user = await makeUser()
    const newBanner = faker.internet.url()

    const sut = await updateUserBannerService({
      bannerPath: newBanner,
      userId: user.id,
    })

    expect(sut).toEqual({
      user: expect.objectContaining({
        bannerPath: newBanner,
      }),
    })
  })

  it('should not be able to update user banner with invalid userId', async () => {
    const sut = await updateUserBannerService({
      bannerPath: faker.internet.url(),
      userId: faker.string.uuid(),
    })

    expect(sut).toBeInstanceOf(UserNotFoundError)
  })
})
