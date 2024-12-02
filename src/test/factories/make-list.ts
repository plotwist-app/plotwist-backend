import { db } from '@/db'
import { schema } from '@/db/schema'
import type { InsertListModel, } from '@/domain/entities/lists'
import { faker } from '@faker-js/faker'

type Overrides = Partial<InsertListModel> & { userId: string }

export function makeRawList(overrides: Overrides): InsertListModel {
  return {
    title: faker.book.title(),
    visibility: 'PUBLIC',
    ...overrides,
  }
}

export async function makeList(overrides: Overrides) {
  const [list] = await db
    .insert(schema.lists)
    .values(makeRawList(overrides))
    .returning()

  return list
}
