import { db } from '..'
import { schema } from '../schema'
import type { InsertUserImportWithItems } from '@/domain/entities/import'
import { randomUUID } from 'node:crypto'

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

    const userImportId = userImport.id

    const seriesWithIds = series.map(item => ({
      id: item.id || randomUUID(),
      importId: userImportId,
      name: item.name,
      startDate: item.startDate,
      endDate: item.endDate,
      userItemStatus: item.userItemStatus,
      importStatus: item.importStatus,
      tmdbId: item.tmdbId,
      watchedEpisodes: item.watchedEpisodes,
      seriesEpisodes: item.seriesEpisodes,
    }))

    const savedSeries = await trx
      .insert(schema.importSeries)
      .values(seriesWithIds)
      .returning()

    const moviesWithIds = movies.map(item => ({
      id: item.id || randomUUID(),
      importId: userImportId,
      name: item.name,
      startDate: item.startDate,
      endDate: item.endDate,
      userItemStatus: item.userItemStatus,
      importStatus: item.importStatus,
      tmdbId: item.tmdbId,
    }))

    const savedMovies = await trx
      .insert(schema.importMovies)
      .values(moviesWithIds)
      .returning()

    return { userImport, series: savedSeries, movies: savedMovies }
  })

  return transaction
}
