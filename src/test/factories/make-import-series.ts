import type { InsertImportSeries } from '@/domain/entities/import-series'
import type { ImportStatusEnum } from '@/domain/value-objects/import-item-status-enum'
import type { UserItemStatus } from '@/domain/value-objects/item-status-enum'

import { faker } from '@faker-js/faker'

type Overrides = Partial<InsertImportSeries>

export function makeRawImportSeries(overrides: Overrides): InsertImportSeries {
  const params = buildItemType()
  return {
    ...params,
    name: faker.book.title(),
    ...overrides,
  }
}

export function makeManyRawImportSeries(
  quantity: number,
  overrides: Overrides
) {
  const series = []
  for (let i = 0; i < quantity; i++) {
    const movie = makeRawImportSeries(overrides)
    series.push(movie)
  }

  return series
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
