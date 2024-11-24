import { randomUUID } from 'node:crypto'

import { relations, sql } from 'drizzle-orm'
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  timestamp,
  unique,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

import { likes } from './likes'

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
export const statusEnum = pgEnum('status', ['WATCHLIST', 'WATCHED', 'WATCHING'])

export const followers = pgTable(
  'followers',
  {
    followerId: uuid('follower_id')
      .references(() => users.id, {
        onDelete: 'cascade',
      })
      .notNull(),
    followedId: uuid('followed_id')
      .references(() => users.id, {
        onDelete: 'cascade',
      })
      .notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  table => {
    return {
      pk: primaryKey({
        columns: [table.followedId, table.followerId],
      }),
    }
  }
)

export const followersRelations = relations(followers, ({ one }) => ({
  follower: one(users, {
    fields: [followers.followerId],
    references: [users.id],
    relationName: 'followerRelation',
  }),
  followed: one(users, {
    fields: [followers.followedId],
    references: [users.id],
    relationName: 'followedRelation',
  }),
}))

export const listItems = pgTable(
  'list_items',
  {
    id: uuid('id')
      .$defaultFn(() => randomUUID())
      .notNull(),
    listId: uuid('list_id')
      .references(() => lists.id, { onDelete: 'cascade' })
      .notNull(),
    tmdbId: integer('tmdb_id').notNull(),
    mediaType: mediaTypeEnum('media_type').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    position: integer('position'),
  },
  table => {
    return {
      pk: primaryKey({
        columns: [table.id, table.listId],
      }),
    }
  }
)

export const listItemsRelations = relations(listItems, ({ one, many }) => ({
  lists: one(lists, {
    fields: [listItems.listId],
    references: [lists.id],
  }),
}))

export const lists = pgTable(
  'lists',
  {
    id: uuid('id')
      .$defaultFn(() => randomUUID())
      .primaryKey()
      .notNull(),
    title: varchar('title').notNull(),
    userId: uuid('user_id')
      .references(() => users.id, {
        onDelete: 'cascade',
      })
      .notNull(),
    description: varchar('description'),
    bannerPath: varchar('banner_path'),
    visibility: listVisibilityEnum('visibility').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  table => {
    return {
      userId: index('user_id_idx').on(table.userId),
    }
  }
)

export const listRelations = relations(lists, ({ one, many }) => ({
  listItems: many(listItems),
  users: one(users, {
    fields: [lists.userId],
    references: [users.id],
  }),
}))

export const reviewReplies = pgTable('review_replies', {
  id: uuid('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  reply: varchar('reply').notNull(),
  reviewId: uuid('review_id')
    .references(() => reviews.id, { onDelete: 'cascade' })
    .notNull(),
})

export const reviewsRepliesRelations = relations(
  reviewReplies,
  ({ one, many }) => ({
    users: one(users, {
      fields: [reviewReplies.userId],
      references: [users.id],
    }),
    reviews: one(reviews, {
      fields: [reviewReplies.reviewId],
      references: [reviews.id],
    }),
  })
)

export const reviews = pgTable('reviews', {
  id: uuid('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  tmdbId: integer('tmdb_id').notNull(),
  mediaType: mediaTypeEnum('media_type').notNull(),
  review: varchar('review').notNull(),
  rating: integer('rating').notNull(),
  hasSpoilers: boolean('has_spoilers').notNull().default(false),
  language: languagesEnum('language'),
})

export const reviewsRelations = relations(reviews, ({ one, many }) => ({
  users: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
}))

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  type: subscriptionTypeEnum('type').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
}))

export const users = pgTable(
  'users',
  {
    id: uuid('id')
      .$defaultFn(() => randomUUID())
      .primaryKey(),
    username: varchar('username').notNull().unique(),
    email: varchar('email').notNull().unique(),
    password: varchar('password').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    subscriptionType: subscriptionTypeEnum('subscription_type')
      .notNull()
      .default('MEMBER'),
    bannerPath: varchar('banner_path'),
    imagePath: varchar('image_path'),
    isLegacy: boolean('is_legacy').default(false),
    biography: varchar('biography'),
  },
  table => {
    return {
      email: index('email_idx').on(table.email),
      username: index('username_idx').on(table.username),
    }
  }
)

export const usersRelations = relations(users, ({ one, many }) => ({
  subscriptions: many(subscriptions),
  lists: many(lists),
  reviewReplies: many(reviewReplies),
  reviews: many(reviews),
  followers: many(followers, { relationName: 'followerRelation' }),
  following: many(followers, { relationName: 'followedRelation' }),
}))

export const userItems = pgTable(
  'user_items',
  {
    id: uuid('id').default(sql`gen_random_uuid()`).primaryKey(),
    userId: uuid('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    tmdbId: integer('tmdb_id').notNull(),
    addedAt: timestamp('added_at').defaultNow().notNull(),
    position: integer('position'),
    mediaType: mediaTypeEnum('media_type').notNull(),
    status: statusEnum('status').notNull(),
  },
  userItems => ({
    uniqueUserItem: unique('user_items_userid_tmdbid_media_type_unique').on(
      userItems.userId,
      userItems.tmdbId,
      userItems.mediaType
    ),
  })
)

export const userItemsRelations = relations(userItems, ({ one }) => ({
  user: one(users, {
    fields: [userItems.userId],
    references: [users.id],
  }),
}))

export const magicTokens = pgTable(
  'magic_tokens',
  {
    id: uuid('id')
      .$defaultFn(() => randomUUID())
      .primaryKey(),
    userId: uuid('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    token: varchar('token').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    used: boolean('used').default(false).notNull(),
  },
  table => {
    return {
      userIdIndex: index('token_user_id_idx').on(table.userId),
      tokenIndex: index('token_idx').on(table.token),
    }
  }
)

export const magicTokensRelations = relations(magicTokens, ({ one }) => ({
  user: one(users, {
    fields: [magicTokens.userId],
    references: [users.id],
  }),
}))

export const socialPlatformsEnum = pgEnum('social_platforms', [
  'INSTAGRAM',
  'TIKTOK',
  'YOUTUBE',
  'X', // Twitter/X
])

export const socialLinks = pgTable(
  'social_links',
  {
    id: uuid('id')
      .$defaultFn(() => randomUUID())
      .primaryKey(),
    userId: uuid('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    platform: socialPlatformsEnum('platform').notNull(),
    url: varchar('url').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  table => {
    return {
      userPlatformUniqueConstraint: unique('user_platform_unique').on(
        table.userId,
        table.platform
      ),
    }
  }
)

export const socialLinksRelations = relations(socialLinks, ({ one }) => ({
  user: one(users, {
    fields: [socialLinks.userId],
    references: [users.id],
  }),
}))

export const userEpisodes = pgTable(
  'user_episodes',
  {
    id: uuid('id')
      .$defaultFn(() => randomUUID())
      .primaryKey(),
    userId: uuid('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    tmdbId: integer('tmdb_id').notNull(),
    seasonNumber: integer('season_number').notNull(),
    episodeNumber: integer('episode_number').notNull(),
    watchedAt: timestamp('watched_at').defaultNow().notNull(),
  },
  table => {
    return {
      uniqueEpisode: unique('user_episode_unique').on(
        table.userId,
        table.tmdbId,
        table.seasonNumber,
        table.episodeNumber
      ),
    }
  }
)

export const userEpisodesRelations = relations(userEpisodes, ({ one }) => ({
  user: one(users, {
    fields: [userEpisodes.userId],
    references: [users.id],
  }),
}))

export const schema = {
  users,
  userItems,
  reviews,
  reviewReplies,
  lists,
  listItems,
  subscriptions,
  magicTokens,
  socialLinks,
  userEpisodes,
  likes,
}
