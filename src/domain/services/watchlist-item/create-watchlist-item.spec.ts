import { makeRawUser, makeUser } from '@/test/factories/make-user'
import { describe, expect, it } from 'vitest'
import { createWatchlistItemService } from './create-watchlist-item'
import { faker } from '@faker-js/faker'
import { UserNotFoundError } from '@/domain/errors/user-not-found'

describe('create watchlist item', () => {
  it('should be able to create a watchlist item', async () => {
    const user = await makeUser()
    const sut = await createWatchlistItemService({
      userId: user.id,
      tmdbId: 238, // The Godfather
      mediaType: 'MOVIE',
    })

    expect(sut).toEqual({
      watchlistIItem: expect.objectContaining({
        tmdbId: user.email,
      }),
    })
  })

  it('should not be able to create a watchlist item with invalid user id', async () => {
    const sut = await createWatchlistItemService({
      userId: faker.string.uuid(),
      tmdbId: 238, // The Godfather
      mediaType: 'MOVIE',
    })

    expect(sut).toBeInstanceOf(UserNotFoundError)
  })
})
