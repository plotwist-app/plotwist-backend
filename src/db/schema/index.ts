import { randomUUID } from 'node:crypto'

import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

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
    createdAt: timestamp('createdAt').defaultNow().notNull(),
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
  }),
  followed: one(users, {
    fields: [followers.followedId],
    references: [users.id],
  }),
}))

export const likes = pgTable('likes', {
  id: uuid('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  entityType: likeEntityEnum('entity_type').notNull(),
  reviewId: uuid('review_id').references(() => reviews.id, {
    onDelete: 'cascade',
  }),
  reviewReplyId: uuid('review_reply_id').references(() => reviewReplies.id, {
    onDelete: 'cascade',
  }),
  userId: uuid('user_id')
    .references(() => users.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const likesRelations = relations(likes, ({ one, many }) => ({
  reviews: one(reviews, {
    fields: [likes.reviewId],
    references: [reviews.id],
  }),
  reviewReplies: one(reviewReplies, {
    fields: [likes.reviewReplyId],
    references: [reviewReplies.id],
  }),
  user: one(users, {
    fields: [likes.userId],
    references: [users.id],
  }),
}))

export const listItems = pgTable(
  'list_items',
  {
    id: uuid('id').$defaultFn(() => randomUUID()),
    listId: uuid('list_id')
      .references(() => lists.id, { onDelete: 'cascade' })
      .notNull(),
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

export const listItemsRelations = relations(listItems, ({ one, many }) => ({
  lists: one(lists, {
    fields: [listItems.listId],
    references: [lists.id],
  }),
}))

export const listLikes = pgTable(
  'list_likes',
  {
    id: uuid('id')
      .$defaultFn(() => randomUUID())
      .primaryKey(),
    listId: uuid('list_id')
      .references(() => lists.id, {
        onDelete: 'cascade',
      })
      .notNull(),
    userId: uuid('user_id')
      .references(() => users.id, {
        onDelete: 'cascade',
      })
      .notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  table => {
    return {
      listIdIndex: index('list_id_idx').on(table.listId),
      listUserCompositeIndex: index('list_user_idx').on(
        table.listId,
        table.userId
      ),
    }
  }
)

export const listLikesRelations = relations(listLikes, ({ one }) => ({
  lists: one(lists, {
    fields: [listLikes.listId],
    references: [lists.id],
  }),
  user: one(users, {
    fields: [listLikes.userId],
    references: [users.id],
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
    coverPath: varchar('cover_path'),
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
  listLikes: many(listLikes),
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
    likes: many(likes),
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
  tmdbId: integer('tmdb_id'),
  mediaType: mediaTypeEnum('media_type'),
  review: varchar('review').notNull(),
  rating: integer('rating').notNull(),
  hasSpoilers: boolean('has_spoilers').default(false),
  tmdbTitle: varchar('tmdb_title'),
  tmdbPosterPath: varchar('tmdb_poster_path'),
  tmdbOverview: varchar('tmdb_overview'),
  language: languagesEnum('language'),
})

export const reviewsRelations = relations(reviews, ({ one, many }) => ({
  likes: many(likes),
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
    createdAt: timestamp('created_at').defaultNow(),
    subscriptionType: subscriptionTypeEnum('subscription_type'),
    bannerPath: varchar('banner_path'),
    imagePath: varchar('image_path'),
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
  likes: many(likes),
  listLikes: many(listLikes),
  lists: many(lists),
  reviewReplies: many(reviewReplies),
  reviews: many(reviews),
  followers: many(followers),
}))

export const schema = {
  users,
  reviews,
  lists,
  listLikes,
  listItems,
}
