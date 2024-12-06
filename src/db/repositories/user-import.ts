import { db } from '..'
import { schema } from '../schema'
import { randomUUID } from 'node:crypto'

import type { InsertUserImportWithItems } from '@/domain/entities/import'
import type { InsertImportSeries } from '@/domain/entities/import-series'
import type { InsertImportMovie } from '@/domain/entities/import-movies'
import type { PgTransaction } from 'drizzle-orm/pg-core'
import type { PostgresJsQueryResultHKT } from 'drizzle-orm/postgres-js'
import type { ExtractTablesWithRelations } from 'drizzle-orm'

type TrxType = PgTransaction<
  PostgresJsQueryResultHKT,
  typeof import('../schema'),
  ExtractTablesWithRelations<typeof import('../schema')>
>

export async function insertUserImport({
  userId,
  itemsCount,
  provider,
  movies,
  series,
}: InsertUserImportWithItems) {
  const transaction = await db.transaction(async trx => {
    const [userImport] = await trx
      .insert(schema.userImports)
      .values({
        userId,
        itemsCount,
        provider,
        importStatus: 'NOT_STARTED',
      })
      .returning()

    const importId = userImport.id

    const savedMovies = await saveMovies(movies, importId, trx)

    const savedSeries = await saveMovies(series, importId, trx)

    return { userImport, series: savedSeries, movies: savedMovies }
  })

  return transaction
}

async function saveMovies(
  movies: Omit<InsertImportMovie, 'importId'>[],
  importId: string,
  trx: TrxType
) {
  if (movies.length > 0) {
    const parsedMovies = movies.map(item => ({
      id: item.id || randomUUID(),
      importId: importId,
      name: item.name,
      endDate: item.endDate,
      userItemStatus: item.userItemStatus,
      importStatus: item.importStatus,
      tmdbId: item.tmdbId,
    }))

    return await trx
      .insert(schema.importMovies)
      .values(parsedMovies)
      .returning()
  }

  return []
}

async function saveSeries(
  series: Omit<InsertImportSeries, 'importId'>[],
  importId: string,
  trx: TrxType
) {
  if (series.length > 0) {
    const parsedSeries = series.map(item => ({
      id: item.id || randomUUID(),
      importId: importId,
      name: item.name,
      startDate: item.startDate,
      endDate: item.endDate,
      userItemStatus: item.userItemStatus,
      importStatus: item.importStatus,
      tmdbId: item.tmdbId,
      watchedEpisodes: item.watchedEpisodes,
      seriesEpisodes: item.seriesEpisodes,
    }))

    return await trx
      .insert(schema.importSeries)
      .values(parsedSeries)
      .returning()
  }

  return []
}
