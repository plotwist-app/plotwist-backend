import type { InsertWatchlistItem } from '@/domain/entities/watchlist-item'
import { db } from '..'
import { schema } from '../schema'
import type { GetWatchlistItemsInput } from '@/domain/services/watchlist-item/get-watchlist-items'
import { desc, eq } from 'drizzle-orm'

export async function insertWatchlistItem(values: InsertWatchlistItem) {
  return db.insert(schema.watchlistItems).values(values).returning()
}

export async function selectWatchlistItems({
  userId,
}: Omit<GetWatchlistItemsInput, 'language'>) {
  return db
    .select()
    .from(schema.watchlistItems)
    .where(eq(schema.watchlistItems.userId, userId))
    .orderBy(desc(schema.watchlistItems.addedAt))
    .limit(20)
}
