import { randomUUID } from 'node:crypto'

import {
  PgUUID,
  bigint,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  time,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import { table } from 'node:console'

export const likeEntityEnum = pgEnum('like_entity', ['REVIEW', 'REPLY'])

export const listVisibilityEnum = pgEnum('list_visibility', [
  'PUBLIC',
  'NETWORK',
  'PRIVATE',
])

// export const subscriptionTypeEnum = pgEnum('subscription_type', [
//   'MEMBER',
//   'PRO',
// ])

export const mediaTypeEnum = pgEnum('media_type', ['TV_SHOW', 'MOVIE'])

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
  entityType: likeEntityEnum('entity_type').notNull(),
  reviewId: uuid('review_id'),
  reviewReplyId: uuid('review_reply_id'),
  userId: uuid('user_id').notNull(),
})

export const listItems = pgTable(
  'list_items',
  {
    id: text('id')
      .$defaultFn(() => randomUUID())
      .primaryKey(),
    listId: uuid('list_id').notNull().primaryKey(),
    title: varchar('title'),
    overview: varchar('overview'),
    backdropPath: varchar('backdrop_path'),
    posterPath: varchar('poster_path'),
    tmdbId: integer('tmdb_id'),
    mediaType: mediaTypeEnum('media_type'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  table => {
    return {
      pk: primaryKey({
        columns: [table.id, table.listId],
      }),
    }
  }
)

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
  visibility: listVisibilityEnum('visibility').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
