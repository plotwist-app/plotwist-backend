import { randomUUID } from 'node:crypto'
import {
  integer,
  pgTable,
  timestamp,
  uuid,
  primaryKey,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { users } from '.'

export const watchlistItems = pgTable('watchlist_items', {
  id: uuid('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  tmdbId: integer('tmdb_id').notNull(),
  addedAt: timestamp('added_at').defaultNow().notNull(),
  position: integer('position'),
})

export const watchlistItemsRelations = relations(watchlistItems, ({ one }) => ({
  user: one(users, {
    fields: [watchlistItems.userId],
    references: [users.id],
  }),
}))
