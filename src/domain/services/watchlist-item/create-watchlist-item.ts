import { insertWatchlistItem } from '@/db/repositories/watchlist-item'
import { PgIntegrityConstraintViolation } from '@/db/utils/postgres-errors'
import type { InsertWatchlistItem } from '@/domain/entities/watchlist-item'
import { UserNotFoundError } from '@/domain/errors/user-not-found'
import postgres from 'postgres'

export async function createWatchlistItemService(values: InsertWatchlistItem) {
  try {
    const [watchlistItem] = await insertWatchlistItem(values)

    return { watchlistItem }
  } catch (error) {
    if (error instanceof postgres.PostgresError) {
      if (error.code === PgIntegrityConstraintViolation.ForeignKeyViolation) {
        return new UserNotFoundError()
      }
    }

    throw error
  }
}
