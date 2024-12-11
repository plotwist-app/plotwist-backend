import { db } from '..'
import { schema } from '../schema'
import { randomUUID } from 'node:crypto'

import type {
  InsertUserImportWithItems,
  UserImport,
} from '@/domain/entities/import'
import type {
  ImportSeries,
  InsertImportSeries,
} from '@/domain/entities/import-series'
import type {
  ImportMovie,
  InsertImportMovie,
} from '@/domain/entities/import-movies'
import type { PgTransaction } from 'drizzle-orm/pg-core'
import type { PostgresJsQueryResultHKT } from 'drizzle-orm/postgres-js'
import { sql, type ExtractTablesWithRelations } from 'drizzle-orm'

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

    const savedSeries = await saveSeries(series, importId, trx)

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

export type GetImportResult = {
  userImport: UserImport
  series: ImportSeries[]
  movies: ImportMovie[]
}

export async function GetImport(id: string): Promise<GetImportResult> {
  const [{ result }] = (await db.execute(sql`
     SELECT jsonb_build_object(
        'userImport', jsonb_build_object(
          'id', ${schema.userImports.id},
          'userId', ${schema.userImports.userId},
          'itemsCount', ${schema.userImports.itemsCount},
          'provider', ${schema.userImports.provider},
          'importStatus', ${schema.userImports.importStatus},
          'createdAt', ${schema.userImports.createdAt},
          'updatedAt', ${schema.userImports.updatedAt}
        ),
        'movies', COALESCE((
          SELECT jsonb_agg(jsonb_build_object(
            'id', ${schema.importMovies.id},
            'name', ${schema.importMovies.name},
            'endDate', ${schema.importMovies.endDate},
            'userItemStatus', ${schema.importMovies.userItemStatus},
            'importStatus', ${schema.importMovies.importStatus},
            'tmdbId', ${schema.importMovies.tmdbId}
          ))
          FROM ${schema.importMovies}
          WHERE ${schema.importMovies.importId} = ${schema.userImports.id}
        ), '[]'::jsonb),
        'series', COALESCE((
          SELECT jsonb_agg(jsonb_build_object(
            'id', ${schema.importSeries.id},
            'name', ${schema.importSeries.name},
            'startDate', ${schema.importSeries.startDate},
            'endDate', ${schema.importSeries.endDate},
            'userItemStatus', ${schema.importSeries.userItemStatus},
            'importStatus', ${schema.importSeries.importStatus},
            'tmdbId', ${schema.importSeries.tmdbId},
            'watchedEpisodes', ${schema.importSeries.watchedEpisodes},
            'seriesEpisodes', ${schema.importSeries.seriesEpisodes}
          ))
          FROM ${schema.importSeries}
          WHERE ${schema.importSeries.importId} = ${schema.userImports.id}
        ), '[]'::jsonb)
      ) AS result
    FROM 
      ${schema.userImports}
    WHERE 
      ${schema.userImports.id} = ${id}
  `)) as { result: GetImportResult }[]

  return result
}
