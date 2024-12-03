import { insertUserImport } from '@/db/repositories/user-import'
import type { InsertUserImportWithItems } from '@/domain/entities/import'

import { randomUUID } from 'node:crypto'
import { makeUserReturningId } from './make-user'
import { makeRawImportSeries } from './make-import-series'
import { makeRawImportMovies } from './make-import-movies'

type Overrides = Partial<InsertUserImportWithItems>

export async function makeRawUserImport(
  overrides: Overrides
): Promise<InsertUserImportWithItems> {
  const rawSeries = makeRawImportSeries({})
  const rawMovies = makeRawImportMovies({})

  const series = [rawSeries]
  const movies = [rawMovies]

  return {
    id: overrides.id ?? randomUUID(),
    itemsCount: series.length + movies.length,
    series,
    movies,
    userId: overrides.userId ?? (await makeUserReturningId({})),
    provider: 'my-anime-list',
    importStatus: 'NOT_STARTED',
    ...overrides,
  }
}

export async function makeUserImport(overrides: Overrides) {
  const userImport = await insertUserImport(await makeRawUserImport(overrides))

  return userImport
}
