import { insertUserImport } from '@/db/repositories/user-import-repository'
import type { InsertUserImportWithItems } from '@/domain/entities/import'

import { randomUUID } from 'node:crypto'
import { makeUserReturningId } from './make-user'
import { makeManyRawImportSeries } from './make-import-series'
import { makeManyRawImportMovies } from './make-import-movies'

type Overrides = Partial<InsertUserImportWithItems>

export async function makeRawUserImport(
  overrides: Overrides
): Promise<InsertUserImportWithItems> {
  const series = overrides.series ?? makeManyRawImportSeries(1, {})
  const movies = overrides.movies ?? makeManyRawImportMovies(1, {})

  return {
    id: overrides.id ?? randomUUID(),
    itemsCount: series.length + movies.length,
    series,
    movies,
    userId: overrides.userId ?? (await makeUserReturningId({})),
    provider: 'MY_ANIME_LIST',
    importStatus: 'NOT_STARTED',
    ...overrides,
  }
}

export async function makeUserImport(overrides: Overrides) {
  const userImport = await insertUserImport(await makeRawUserImport(overrides))

  return userImport
}
