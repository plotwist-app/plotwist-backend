import { schema } from '@/db/schema'
import type { InferInsertModel } from 'drizzle-orm'
import { faker } from '@faker-js/faker'
import { db } from '@/db'
import type { InsertListModel, List } from '@/app/domain/entities/lists'

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
