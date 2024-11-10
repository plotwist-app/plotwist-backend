import { faker } from '@faker-js/faker'
import type { InsertWatchlistItem } from '@/domain/entities/watchlist-item'
import { insertWatchlistItem } from '@/db/repositories/watchlist-item'

type Overrides = Partial<InsertWatchlistItem> & {
  userId: string
}

export function makeRawWatchlistItem(
  overrides: Overrides
): InsertWatchlistItem {
  return {
    tmdbId: faker.number.int({ min: 1, max: 1_0000 }),
    mediaType: 'MOVIE',
    ...overrides,
  }
}

export async function makeWatchlistItem(overrides: Overrides) {
  const [user] = await insertWatchlistItem(makeRawWatchlistItem(overrides))

  return user
}
