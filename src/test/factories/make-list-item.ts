import { schema } from '@/db/schema'
import { faker } from '@faker-js/faker'
import { db } from '@/db'
import type { InsertListItem } from '@/domain/entities/list-item'

type Overrides = Partial<InsertListItem> & { listId: string }

export function makeRawListItem(overrides: Overrides): InsertListItem {
  return {
    title: faker.lorem.words(3),
    tmdbId: faker.number.int({ min: 0, max: 1_000 }),
    overview: faker.lorem.words(5),
    position: faker.number.int({ min: 0, max: 1_000 }),
    ...overrides,
  }
}

export async function makeListItem(overrides: Overrides) {
  const [list] = await db
    .insert(schema.listItems)
    .values(makeRawListItem(overrides))
    .returning()

  return list
}
