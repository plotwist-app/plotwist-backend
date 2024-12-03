import type { InsertImportMovie } from '@/domain/entities/import-movies'
import type {
  ImportStatusEnum,
  UserItemStatus,
} from '@/domain/value_objects/import_item_status_enum'

import { faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'

type Overrides = Partial<InsertImportMovie>

export function makeRawImportMovies(
  overrides: Overrides
): Omit<InsertImportMovie, 'importId'> {
  const params = buildItemType()
  return {
    ...params,
    id: overrides.id ?? randomUUID(),
    name: faker.book.title(),
    ...overrides,
  }
}

function buildItemType(): Omit<InsertImportMovie, 'id' | 'name' | 'importId'> {
  const importStatus: ImportStatusEnum = faker.helpers.arrayElement([
    'COMPLETED',
    'FAILED',
    'NOT_STARTED',
  ])

  const userItemStatus: UserItemStatus = faker.helpers.arrayElement([
    'WATCHLIST',
    'WATCHED',
    'WATCHING',
    'DROPPED',
  ])

  return {
    userItemStatus,
    importStatus,
  }
}
