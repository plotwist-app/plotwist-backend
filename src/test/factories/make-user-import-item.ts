import type { InsertUserImportItem } from '@/domain/entities/import-item'
import type {
  ImportStatusEnum,
  UserItemStatus,
} from '@/domain/value_objects/import_item_status_enum'
import type { MediaTypeEnum } from '@/domain/value_objects/media_type_enum'

import { faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'

type Overrides = Partial<InsertUserImportItem>

export function makeRawUserImportItem(
  overrides: Overrides
): Omit<InsertUserImportItem, 'importId'> {
  const params = buildItemType()
  return {
    ...params,
    id: overrides.id ?? randomUUID(),
    name: faker.book.title(),
    ...overrides,
  }
}

function buildItemType(): Omit<
  InsertUserImportItem,
  'id' | 'name' | 'importId'
> {
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
    min: 0,
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
    mediaType,
  }
}
