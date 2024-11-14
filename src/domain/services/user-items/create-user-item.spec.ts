import { makeUser } from '@/test/factories/make-user'
import { describe, expect, it } from 'vitest'
import { createUserItemService } from './create-user-item'
import { faker } from '@faker-js/faker'
import { UserNotFoundError } from '@/domain/errors/user-not-found'

const TMDB_ID = 238 // The Godfather

describe('create user item', () => {
  it('should be able to create a user item', async () => {
    const user = await makeUser()
    const sut = await createUserItemService({
      userId: user.id,
      tmdbId: TMDB_ID,
      mediaType: 'MOVIE',
      status: 'WATCHING',
    })

    expect(sut).toEqual({
      userItem: expect.objectContaining({
        userId: user.id,
        tmdbId: TMDB_ID,
      }),
    })
  })

  it('should not be able to create a user item with invalid user id', async () => {
    const sut = await createUserItemService({
      userId: faker.string.uuid(),
      tmdbId: TMDB_ID,
      mediaType: 'MOVIE',
      status: 'WATCHING',
    })

    expect(sut).toBeInstanceOf(UserNotFoundError)
  })
})
