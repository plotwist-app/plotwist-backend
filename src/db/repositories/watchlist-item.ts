import type { InsertWatchlistItem } from '@/domain/entities/watchlist-item'
import { db } from '..'
import { schema } from '../schema'

export async function insertWatchlistItem(values: InsertWatchlistItem) {
  return db.insert(schema.watchlistItems).values(values).returning()
}
