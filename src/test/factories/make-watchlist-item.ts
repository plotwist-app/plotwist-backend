import { faker } from '@faker-js/faker'
import type { InsertUserItem } from '@/domain/entities/user-item'
import { insertUserItem } from '@/db/repositories/user-item-repository'

type Overrides = Partial<InsertUserItem> & {
  userId: string
}

export function makeRawUserItem(overrides: Overrides): InsertUserItem {
  return {
    tmdbId: faker.number.int({ min: 1, max: 1_0000 }),
    mediaType: 'MOVIE',
    status: 'WATCHLIST',
    ...overrides,
  }
}

export async function makeUserItem(overrides: Overrides) {
  const [user] = await insertUserItem(makeRawUserItem(overrides))

  return user
}
