import { selectWatchlistItems } from '@/db/repositories/watchlist-item'

export type GetWatchlistItemsInput = { userId: string }

export async function getWatchlistItemsService({
  userId,
}: GetWatchlistItemsInput) {
  const watchlistItems = await selectWatchlistItems({ userId })

  return { watchlistItems }
}
