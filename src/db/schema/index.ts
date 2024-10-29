import { randomUUID } from 'node:crypto'

import {
  PgUUID,
  boolean,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  time,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

export const likeEntityEnum = pgEnum('like_entity', ['REVIEW', 'REPLY'])

export const listVisibilityEnum = pgEnum('list_visibility', [
  'PUBLIC',
  'NETWORK',
  'PRIVATE',
])

export const subscriptionTypeEnum = pgEnum('subscription_type', [
  'MEMBER',
  'PRO',
])

export const languagesEnum = pgEnum('languages', [
  'en-US',
  'es-ES',
  'fr-FR',
  'it-IT',
  'de-DE',
  'pt-BR',
  'ja-JP',
])

export const mediaTypeEnum = pgEnum('media_type', ['TV_SHOW', 'MOVIE'])

export const followers = pgTable('followers', {
  id: uuid('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  followerId: uuid('follower_id').notNull(),
  followedId: uuid('followed_id').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
})

export const likes = pgTable('likes', {
  id: uuid('id')
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
    id: uuid('id').$defaultFn(() => randomUUID()),
    listId: uuid('list_id').notNull(),
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
  id: uuid('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  listId: uuid('list_id').notNull(),
  userId: uuid('user_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const lists = pgTable('lists', {
  id: uuid('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  name: varchar('name'),
  userId: uuid('user_id').notNull(),
  description: varchar('description'),
  coverPath: varchar('cover_path'),
  visibility: listVisibilityEnum('visibility').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const profiles = pgTable('profiles', {
  id: uuid('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  email: varchar('email').unique(),
  username: varchar('username').unique().notNull(),
  bannerPath: varchar('banner_path'),
  subscriptionType: subscriptionTypeEnum('subscription_type'),
  imagePath: varchar('image_path').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const reviewReplies = pgTable('review_replies', {
  id: uuid('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  userId: uuid('user_id')
    .$defaultFn(() => randomUUID())
    .notNull(),
  reply: varchar('reply').notNull(),
  reviewId: uuid('review_id')
    .$defaultFn(() => randomUUID())
    .notNull(),
})

export const reviews = pgTable('reviews', {
  id: uuid('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  userId: uuid('user_id')
    .$defaultFn(() => randomUUID())
    .notNull(),
  tmdbId: integer('tmdb_id'),
  mediaType: mediaTypeEnum('media_type'),
  review: varchar('review'),
  rating: integer('rating'),
  hasSpoilers: boolean('has_spoilers'),
  tmdbTitle: varchar('tmdb_title'),
  tmdbPosterPath: varchar('tmdb_poster_path'),
  tmdbOverview: varchar('tmdb_overview'),
  language: languagesEnum('language'),
})

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  userId: uuid('user_id')
    .$defaultFn(() => randomUUID())
    .notNull(),
  type: subscriptionTypeEnum('type').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
