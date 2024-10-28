import { randomUUID } from 'node:crypto'
import { relations } from 'drizzle-orm'
import {
  PgUUID,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

export const followers = pgTable('followers', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  followerId: uuid('follower_id').notNull(),
  followedId: uuid('followed_id').notNull(),
  createdAt: timestamp('createdAt').notNull(),
})

export const likes = pgTable('likes', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  entityType: varchar('entity_type').notNull(),
  reviewId: uuid('review_id'),
  reviewReplyId: uuid('review_reply_id'),
  userId: uuid('user_id').notNull(),
})
