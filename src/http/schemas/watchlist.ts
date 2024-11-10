import { schema } from '@/db/schema'
import { createInsertSchema } from 'drizzle-zod'

export const createWatchlistItemBodySchema = createInsertSchema(
  schema.watchlistItems
).pick({ tmdbId: true })
