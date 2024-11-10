import { randomUUID } from "crypto";
import { relations } from "drizzle-orm";
import { integer, pgTable, uuid, timestamp} from "drizzle-orm/pg-core";
import { users } from ".";

export const watchedItems = pgTable(
  'watched_items',
  {
    id: uuid('id')
      .$defaultFn(() => randomUUID())
      .primaryKey(),
    userId: uuid('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    tmdbId: integer('tmdb_id').notNull(),
    watchedAt: timestamp('watched_at').defaultNow().notNull()  
  }
);

export const watchedItemsRelations = relations(watchedItems, ({ one }) => ({
  user: one(users, {
    fields: [watchedItems.userId],
    references: [users.id],
  }),
}));
