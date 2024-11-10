import { insertWatchlistItem } from '@/db/repositories/watchlist-item'
import type { InsertWatchlistItem } from '@/domain/entities/watchlist-item'

export async function createWatchlistItemService(values: InsertWatchlistItem) {
  const [watchlistItem] = await insertWatchlistItem(values)

  return { watchlistItem }
}
