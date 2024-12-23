import type { InsertImportMovie } from '@/domain/entities/import-movies'
import type { ImportStatusEnum } from '@/@types/import-item-status-enum'
import type { UserItemStatus } from '@/@types/item-status-enum'

import { faker } from '@faker-js/faker'

type Overrides = Partial<InsertImportMovie>

export function makeRawImportMovies(overrides: Overrides) {
  const params = buildItemType()
  return {
    ...params,
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

function buildItemType() {
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
