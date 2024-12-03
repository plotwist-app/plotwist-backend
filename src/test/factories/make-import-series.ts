import type { InsertImportSeries } from '@/domain/entities/import-series'
import type {
  ImportStatusEnum,
  UserItemStatus,
} from '@/domain/value_objects/import_item_status_enum'

import { faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'

type Overrides = Partial<InsertImportSeries>

export function makeRawImportSeries(
  overrides: Overrides
): Omit<InsertImportSeries, 'importId'> {
  const params = buildItemType()
  return {
    ...params,
    id: overrides.id ?? randomUUID(),
    name: faker.book.title(),
    ...overrides,
  }
}

function buildItemType(): Omit<InsertImportSeries, 'id' | 'name' | 'importId'> {
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

  const seriesEpisodes = faker.helpers.rangeToNumber({
    min: 2,
    max: 300,
  })

  let watchedEpisodes = faker.helpers.rangeToNumber({
    min: 0,
    max: seriesEpisodes,
  })

  if (userItemStatus === 'WATCHLIST') {
    watchedEpisodes = 0
  }

  if (userItemStatus === 'WATCHED') {
    watchedEpisodes = seriesEpisodes
  }

  return {
    seriesEpisodes,
    watchedEpisodes,
    userItemStatus,
    importStatus,
  }
}
