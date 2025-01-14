import { integer, pgTable, text, uuid } from 'drizzle-orm/pg-core'
import { users } from './index'
import { createInsertSchema } from 'drizzle-zod'

export const userPreferences = pgTable('user_preferences', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull()
    .unique(),
  watchProvidersIds: integer('watch_providers_ids').array(),
  watchRegion: text('watch_region'),
})

export const insertUserPreferencesSchema = createInsertSchema(userPreferences)
