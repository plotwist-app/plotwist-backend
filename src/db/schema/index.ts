import { randomUUID } from 'node:crypto'
import { relations } from 'drizzle-orm'
import {
  PgUUID,
  bigint,
  integer,
  pgTable,
  text,
  time,
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
  createdAt: timestamp('createdAt').defaultNow().notNull(),
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

export const listItems = pgTable('list_items', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  listId: uuid('list_id').notNull().primaryKey(),
  title: varchar('title'),
  overview: varchar('overview'),
  backdropPath: varchar('backdrop_path'),
  posterPath: varchar('poster_path'),
  tmdbId: integer('tmdb_id'),
  mediaType: varchar('media_type'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const listLikes = pgTable('list_likes', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  listId: uuid('list_id').notNull(),
  userId: uuid('user_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const lists = pgTable('lists', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  name: varchar('name'),
  userId: uuid('user_id').notNull(),
  description: varchar('description'),
  coverPath: varchar('cover_path'),
  visibility: varchar('visibility').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
