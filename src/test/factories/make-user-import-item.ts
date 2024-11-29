import { insertUserImport } from '@/db/repositories/user-import'
import type { InsertUserImportItem } from '@/domain/entities/import-item'
import {
  ImportItemStatusEnum,
  ImportStatusEnum,
  UserItemStatus,
} from '@/domain/value_objects/import_item_status_enum'
import { MediaTypeEnum } from '@/domain/value_objects/media_type_enum'

import { Faker, faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'

type Overrides = Partial<InsertUserImportItem>

export function makeRawUserImportItem(
  overrides: Overrides
): InsertUserImportItem {
  return {
    importId: overrides.importId ?? randomUUID(),
    name: faker.book.title(),
    ...overrides,
  }
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

  const mediaType: MediaTypeEnum = faker.helpers.arrayElement([
    'TV_SHOW',
    'MOVIE',
  ])

  let seriesEpisodes = faker.helpers.rangeToNumber({
    min: 2,
    max: 300,
  })

  let watchedEpisodes = faker.helpers.rangeToNumber({
    min: 10,
    max: seriesEpisodes,
  })

  if (mediaType === 'MOVIE') {
    seriesEpisodes = 1
  }

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
