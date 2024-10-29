// src/db/schema/index.ts
import { randomUUID } from "node:crypto";
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
  varchar
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
var likeEntityEnum = pgEnum("like_entity", ["REVIEW", "REPLY"]);
var listVisibilityEnum = pgEnum("list_visibility", [
  "PUBLIC",
  "NETWORK",
  "PRIVATE"
]);
var subscriptionTypeEnum = pgEnum("subscription_type", [
  "MEMBER",
  "PRO"
]);
var languagesEnum = pgEnum("languages", [
  "en-US",
  "es-ES",
  "fr-FR",
  "it-IT",
  "de-DE",
  "pt-BR",
  "ja-JP"
]);
var mediaTypeEnum = pgEnum("media_type", ["TV_SHOW", "MOVIE"]);
var followers = pgTable(
  "followers",
  {
    followerId: uuid("follower_id").references(() => profiles.id, {
      onDelete: "cascade"
    }).notNull(),
    followedId: uuid("followed_id").references(() => profiles.id, {
      onDelete: "cascade"
    }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull()
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [table.followedId, table.followerId]
      })
    };
  }
);
var followersRelations = relations(followers, ({ one }) => ({
  followerProfile: one(profiles, {
    fields: [followers.followerId],
    references: [profiles.id]
  }),
  followedProfile: one(profiles, {
    fields: [followers.followedId],
    references: [profiles.id]
  })
}));
var likes = pgTable("likes", {
  id: uuid("id").$defaultFn(() => randomUUID()).primaryKey(),
  entityType: likeEntityEnum("entity_type").notNull(),
  reviewId: uuid("review_id").references(() => reviews.id, {
    onDelete: "cascade"
  }),
  reviewReplyId: uuid("review_reply_id").references(() => reviewReplies.id, {
    onDelete: "cascade"
  }),
  profileId: uuid("profile_id").references(() => profiles.id, {
    onDelete: "cascade"
  }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var likesRelations = relations(likes, ({ one, many }) => ({
  reviews: one(reviews, {
    fields: [likes.reviewId],
    references: [reviews.id]
  }),
  reviewReplies: one(reviewReplies, {
    fields: [likes.reviewReplyId],
    references: [reviewReplies.id]
  }),
  profile: one(profiles, {
    fields: [likes.profileId],
    references: [profiles.id]
  })
}));
var listItems = pgTable(
  "list_items",
  {
    id: uuid("id").$defaultFn(() => randomUUID()),
    listId: uuid("list_id").references(() => lists.id, { onDelete: "cascade" }).notNull(),
    title: varchar("title"),
    overview: varchar("overview"),
    backdropPath: varchar("backdrop_path"),
    posterPath: varchar("poster_path"),
    tmdbId: integer("tmdb_id"),
    mediaType: mediaTypeEnum("media_type"),
    createdAt: timestamp("created_at").defaultNow().notNull()
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [table.id, table.listId]
      })
    };
  }
);
var listItemsRelations = relations(listItems, ({ one, many }) => ({
  lists: one(lists, {
    fields: [listItems.listId],
    references: [lists.id]
  })
}));
var listLikes = pgTable("list_likes", {
  id: uuid("id").$defaultFn(() => randomUUID()).primaryKey(),
  listId: uuid("list_id").references(() => lists.id, {
    onDelete: "cascade"
  }).notNull(),
  profileId: uuid("profile_id").references(() => profiles.id, {
    onDelete: "cascade"
  }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var listLikesRelations = relations(listLikes, ({ one }) => ({
  lists: one(lists, {
    fields: [listLikes.listId],
    references: [lists.id]
  }),
  profile: one(profiles, {
    fields: [listLikes.profileId],
    references: [profiles.id]
  })
}));
var lists = pgTable(
  "lists",
  {
    id: uuid("id").$defaultFn(() => randomUUID()).primaryKey(),
    name: varchar("name"),
    profileId: uuid("profile_id").references(() => profiles.id, {
      onDelete: "cascade"
    }).notNull(),
    description: varchar("description"),
    coverPath: varchar("cover_path"),
    visibility: listVisibilityEnum("visibility").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull()
  },
  (table) => {
    return {
      profileId: index("profile_id_idx").on(table.profileId)
    };
  }
);
var listRelations = relations(lists, ({ one, many }) => ({
  listItems: many(listItems),
  listLikes: many(listLikes),
  profiles: one(profiles, {
    fields: [lists.profileId],
    references: [profiles.id]
  })
}));
var profiles = pgTable(
  "profiles",
  {
    id: uuid("id").$defaultFn(() => randomUUID()).primaryKey(),
    email: varchar("email").unique(),
    username: varchar("username").unique().notNull(),
    bannerPath: varchar("banner_path"),
    subscriptionType: subscriptionTypeEnum("subscription_type"),
    imagePath: varchar("image_path").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull()
  },
  (table) => {
    return {
      email: index("email_idx").on(table.email),
      username: index("username_idx").on(table.username)
    };
  }
);
var profileRelations = relations(profiles, ({ one, many }) => ({
  subscriptions: many(subscriptions),
  likes: many(likes),
  listLikes: many(listLikes),
  lists: many(lists),
  reviewReplies: many(reviewReplies),
  reviews: many(reviews),
  followers: many(followers)
}));
var reviewReplies = pgTable("review_replies", {
  id: uuid("id").$defaultFn(() => randomUUID()).primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  profileId: uuid("profile_id").references(() => profiles.id, { onDelete: "cascade" }).notNull(),
  reply: varchar("reply").notNull(),
  reviewId: uuid("review_id").references(() => reviews.id, { onDelete: "cascade" }).notNull()
});
var reviewsRepliesRelations = relations(
  reviewReplies,
  ({ one, many }) => ({
    likes: many(likes),
    profiles: one(profiles, {
      fields: [reviewReplies.profileId],
      references: [profiles.id]
    }),
    reviews: one(reviews, {
      fields: [reviewReplies.reviewId],
      references: [reviews.id]
    })
  })
);
var reviews = pgTable("reviews", {
  id: uuid("id").$defaultFn(() => randomUUID()).primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  profileId: uuid("profile_id").references(() => profiles.id, { onDelete: "cascade" }).notNull(),
  tmdbId: integer("tmdb_id"),
  mediaType: mediaTypeEnum("media_type"),
  review: varchar("review"),
  rating: integer("rating"),
  hasSpoilers: boolean("has_spoilers"),
  tmdbTitle: varchar("tmdb_title"),
  tmdbPosterPath: varchar("tmdb_poster_path"),
  tmdbOverview: varchar("tmdb_overview"),
  language: languagesEnum("language")
});
var reviewsRelations = relations(reviews, ({ one, many }) => ({
  likes: many(likes),
  profiles: one(profiles, {
    fields: [reviews.profileId],
    references: [profiles.id]
  })
}));
var subscriptions = pgTable("subscriptions", {
  id: uuid("id").$defaultFn(() => randomUUID()).primaryKey(),
  profileId: uuid("profile_id").references(() => profiles.id, { onDelete: "cascade" }).notNull(),
  type: subscriptionTypeEnum("type").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  profile: one(profiles, {
    fields: [subscriptions.profileId],
    references: [profiles.id]
  })
}));
export {
  followers,
  followersRelations,
  languagesEnum,
  likeEntityEnum,
  likes,
  likesRelations,
  listItems,
  listItemsRelations,
  listLikes,
  listLikesRelations,
  listRelations,
  listVisibilityEnum,
  lists,
  mediaTypeEnum,
  profileRelations,
  profiles,
  reviewReplies,
  reviews,
  reviewsRelations,
  reviewsRepliesRelations,
  subscriptionTypeEnum,
  subscriptions,
  subscriptionsRelations
};
//# sourceMappingURL=index.js.map