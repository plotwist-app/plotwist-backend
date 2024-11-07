import { describe, expect, it } from 'vitest'
import { makeUser } from '@/test/factories/make-user'

import { updateUserImageService } from './update-user-image'
import { faker } from '@faker-js/faker'
import { UserNotFoundError } from '@/domain/errors/user-not-found'

describe('update username image', () => {
  it('should be able to update user image', async () => {
    const user = await makeUser()
    const newImage = faker.internet.url()

    const sut = await updateUserImageService({
      imagePath: newImage,
      userId: user.id,
    })

    expect(sut).toEqual({
      user: expect.objectContaining({
        imagePath: newImage,
      }),
    })
  })

  it('should not be able to update user image with invalid userId', async () => {
    const sut = await updateUserImageService({
      imagePath: faker.internet.url(),
      userId: faker.string.uuid(),
    })

    expect(sut).toBeInstanceOf(UserNotFoundError)
  })
})
