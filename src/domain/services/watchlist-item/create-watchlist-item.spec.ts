import { makeRawUser, makeUser } from '@/test/factories/make-user'
import { describe, expect, it } from 'vitest'
import { createWatchlistItemService } from './create-watchlist-item'
import { faker } from '@faker-js/faker'
import { UserNotFoundError } from '@/domain/errors/user-not-found'

const TMDB_ID = 238 // The Godfather

describe('create watchlist item', () => {
  it('should be able to create a watchlist item', async () => {
    const user = await makeUser()
    const sut = await createWatchlistItemService({
      userId: user.id,
      tmdbId: TMDB_ID,
      mediaType: 'MOVIE',
    })

    expect(sut).toEqual({
      watchlistItem: expect.objectContaining({
        userId: user.id,
        tmdbId: TMDB_ID,
      }),
    })
  })

  it('should not be able to create a watchlist item with invalid user id', async () => {
    const sut = await createWatchlistItemService({
      userId: faker.string.uuid(),
      tmdbId: TMDB_ID,
      mediaType: 'MOVIE',
    })

    expect(sut).toBeInstanceOf(UserNotFoundError)
  })
})
