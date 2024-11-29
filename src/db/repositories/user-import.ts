import { sql } from 'drizzle-orm'
import { db } from '..'
import { schema, userImportItems } from '../schema'
import type { InsertUserImportWithItems } from '@/domain/entities/import'
import { randomUUID } from 'node:crypto'
import { InsertUserImportItem } from '@/domain/entities/import-item'

export async function insertUserImport({
  userId,
  itensCount,
  metadata,
  provider,
  items,
}: InsertUserImportWithItems) {
  const transaction = await db.transaction(async trx => {
    const [userImport] = await trx
      .insert(schema.userImports)
      .values({
        userId,
        itensCount,
        metadata,
        provider,
        status: 'NOT_STARTED',
      })
      .returning()

    const userImportId = userImport.id

    const itemsWithIds = items.map(item => ({
      id: item.id || randomUUID(),
      importId: userImportId,
      mediaType: item.mediaType,
      name: item.name,
      startDate: item.startDate,
      endDate: item.endDate,
      itemStatus: item.itemStatus,
      status: item.status,
      tmdbId: item.tmdbId,
      watchedEpisodes: item.watchedEpisodes,
      seriesEpisodes: item.seriesEpisodes,
      metadata: item.metadata,
    }))

    await trx.insert(schema.userImportItems).values(itemsWithIds)

    return { userImport, items: itemsWithIds }
  })

  return transaction
}
