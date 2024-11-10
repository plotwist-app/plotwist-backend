import type { InsertWatchlistItem } from '@/domain/entities/watchlist-item'
import { db } from '..'
import { schema } from '../schema'

export async function insertWatchlistItem({
  userId,
  tmdbId,
}: InsertWatchlistItem) {
  return db.insert(schema.watchlistItems).values({ userId, tmdbId }).returning()
}
