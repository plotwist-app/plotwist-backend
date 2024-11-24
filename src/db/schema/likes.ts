import { randomUUID } from 'node:crypto'
import { pgTable, uuid, timestamp, varchar, pgEnum } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { users } from '.'

export const likeEntityEnum = pgEnum('like_entity', ['LIST', 'REVIEW', 'REPLY'])

export const likes = pgTable('likes', {
  id: uuid('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  entityId: uuid('entity_id').notNull(),
  entityType: likeEntityEnum('entity_type').notNull(),
  userId: uuid('user_id')
    .references(() => users.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const likesRelations = relations(likes, ({ one }) => ({
  user: one(users, {
    fields: [likes.userId],
    references: [users.id],
  }),
}))
