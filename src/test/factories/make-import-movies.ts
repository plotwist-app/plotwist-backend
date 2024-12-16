import type { InsertImportMovie } from '@/domain/entities/import-movies'
import type {
  ImportStatusEnum,
  UserItemStatus,
} from '@/domain/value-objects/import-item-status-enum'

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

export function makeManyRawImportMovies(
  quantity: number,
  overrides: Overrides
) {
  const movies = []
  for (let i = 0; i < quantity; i++) {
    const movie = makeRawImportMovies(overrides)
    movies.push(movie)
  }

  return movies
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
