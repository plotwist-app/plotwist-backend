import type { schema } from '@/db/schema'
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'

export type WatchListItem = InferSelectModel<typeof schema.watchlistItems>
export type InsertWatchlistItem = Pick<
  InferInsertModel<typeof schema.watchlistItems>,
  'tmdbId' | 'userId'
>
