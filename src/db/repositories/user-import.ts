import { db } from '..'
import { schema } from '../schema'
import type { InsertUserImportWithItems } from '@/domain/entities/import'
import { randomUUID } from 'node:crypto'

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
      userItemStatus: item.userItemStatus,
      importStatus: item.importStatus,
      tmdbId: item.tmdbId,
      watchedEpisodes: item.watchedEpisodes,
      seriesEpisodes: item.seriesEpisodes,
      metadata: item.metadata,
    }))

    const savedItems = await trx
      .insert(schema.userImportItems)
      .values(itemsWithIds)
      .returning()

    return { userImport, items: savedItems }
  })

  return transaction
}
