import { describe, expect, it, beforeAll } from 'vitest'
import { makeUser } from '@/test/factories/make-user'

import { updateUserService } from './update-user'
import type { User } from '@/domain/entities/user'
import { faker } from '@faker-js/faker'

let user: User

describe('update user', () => {
  beforeAll(async () => {
    user = await makeUser()
  })

  it('should be able to update user username', async () => {
    const username = faker.internet.username()

    const sut = await updateUserService({
      userId: user.id,
      username: username,
    })

    expect(sut).toEqual({
      user: expect.objectContaining({
        username: username,
      }),
    })
  })

  it('should be able to update user banner path', async () => {
    const bannerPath = faker.internet.url()
    const sut = await updateUserService({
      userId: user.id,
      bannerPath: bannerPath,
    })

    expect(sut).toEqual({
      user: expect.objectContaining({
        bannerPath: bannerPath,
      }),
    })
  })

  it('should be able to update user image path', async () => {
    const imagePath = faker.internet.url()
    const sut = await updateUserService({
      userId: user.id,
      bannerPath: imagePath,
    })

    expect(sut).toEqual({
      user: expect.objectContaining({
        bannerPath: imagePath,
      }),
    })
  })
})
