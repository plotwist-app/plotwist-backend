"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/db/schema/index.ts
var schema_exports = {};
__export(schema_exports, {
  followers: () => followers,
  followersRelations: () => followersRelations,
  languagesEnum: () => languagesEnum,
  likeEntityEnum: () => likeEntityEnum,
  likes: () => likes,
  likesRelations: () => likesRelations,
  listItems: () => listItems,
  listItemsRelations: () => listItemsRelations,
  listLikes: () => listLikes,
  listLikesRelations: () => listLikesRelations,
  listRelations: () => listRelations,
  listVisibilityEnum: () => listVisibilityEnum,
  lists: () => lists,
  mediaTypeEnum: () => mediaTypeEnum,
  profileRelations: () => profileRelations,
  profiles: () => profiles,
  reviewReplies: () => reviewReplies,
  reviews: () => reviews,
  reviewsRelations: () => reviewsRelations,
  reviewsRepliesRelations: () => reviewsRepliesRelations,
  subscriptionTypeEnum: () => subscriptionTypeEnum,
  subscriptions: () => subscriptions,
  subscriptionsRelations: () => subscriptionsRelations
});
module.exports = __toCommonJS(schema_exports);
var import_node_crypto = require("crypto");
var import_pg_core = require("drizzle-orm/pg-core");
var import_drizzle_orm = require("drizzle-orm");
var likeEntityEnum = (0, import_pg_core.pgEnum)("like_entity", ["REVIEW", "REPLY"]);
var listVisibilityEnum = (0, import_pg_core.pgEnum)("list_visibility", [
  "PUBLIC",
  "NETWORK",
  "PRIVATE"
]);
var subscriptionTypeEnum = (0, import_pg_core.pgEnum)("subscription_type", [
  "MEMBER",
  "PRO"
]);
var languagesEnum = (0, import_pg_core.pgEnum)("languages", [
  "en-US",
  "es-ES",
  "fr-FR",
  "it-IT",
  "de-DE",
  "pt-BR",
  "ja-JP"
]);
var mediaTypeEnum = (0, import_pg_core.pgEnum)("media_type", ["TV_SHOW", "MOVIE"]);
var followers = (0, import_pg_core.pgTable)(
  "followers",
  {
    followerId: (0, import_pg_core.uuid)("follower_id").references(() => profiles.id, {
      onDelete: "cascade"
    }).notNull(),
    followedId: (0, import_pg_core.uuid)("followed_id").references(() => profiles.id, {
      onDelete: "cascade"
    }).notNull(),
    createdAt: (0, import_pg_core.timestamp)("createdAt").defaultNow().notNull()
  },
  (table) => {
    return {
      pk: (0, import_pg_core.primaryKey)({
        columns: [table.followedId, table.followerId]
      })
    };
  }
);
var followersRelations = (0, import_drizzle_orm.relations)(followers, ({ one }) => ({
  followerProfile: one(profiles, {
    fields: [followers.followerId],
    references: [profiles.id]
  }),
  followedProfile: one(profiles, {
    fields: [followers.followedId],
    references: [profiles.id]
  })
}));
var likes = (0, import_pg_core.pgTable)("likes", {
  id: (0, import_pg_core.uuid)("id").$defaultFn(() => (0, import_node_crypto.randomUUID)()).primaryKey(),
  entityType: likeEntityEnum("entity_type").notNull(),
  reviewId: (0, import_pg_core.uuid)("review_id").references(() => reviews.id, {
    onDelete: "cascade"
  }),
  reviewReplyId: (0, import_pg_core.uuid)("review_reply_id").references(() => reviewReplies.id, {
    onDelete: "cascade"
  }),
  profileId: (0, import_pg_core.uuid)("profile_id").references(() => profiles.id, {
    onDelete: "cascade"
  }).notNull(),
  createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow().notNull()
});
var likesRelations = (0, import_drizzle_orm.relations)(likes, ({ one, many }) => ({
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
var listItems = (0, import_pg_core.pgTable)(
  "list_items",
  {
    id: (0, import_pg_core.uuid)("id").$defaultFn(() => (0, import_node_crypto.randomUUID)()),
    listId: (0, import_pg_core.uuid)("list_id").references(() => lists.id, { onDelete: "cascade" }).notNull(),
    title: (0, import_pg_core.varchar)("title"),
    overview: (0, import_pg_core.varchar)("overview"),
    backdropPath: (0, import_pg_core.varchar)("backdrop_path"),
    posterPath: (0, import_pg_core.varchar)("poster_path"),
    tmdbId: (0, import_pg_core.integer)("tmdb_id"),
    mediaType: mediaTypeEnum("media_type"),
    createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow().notNull()
  },
  (table) => {
    return {
      pk: (0, import_pg_core.primaryKey)({
        columns: [table.id, table.listId]
      })
    };
  }
);
var listItemsRelations = (0, import_drizzle_orm.relations)(listItems, ({ one, many }) => ({
  lists: one(lists, {
    fields: [listItems.listId],
    references: [lists.id]
  })
}));
var listLikes = (0, import_pg_core.pgTable)("list_likes", {
  id: (0, import_pg_core.uuid)("id").$defaultFn(() => (0, import_node_crypto.randomUUID)()).primaryKey(),
  listId: (0, import_pg_core.uuid)("list_id").references(() => lists.id, {
    onDelete: "cascade"
  }).notNull(),
  profileId: (0, import_pg_core.uuid)("profile_id").references(() => profiles.id, {
    onDelete: "cascade"
  }).notNull(),
  createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow().notNull()
});
var listLikesRelations = (0, import_drizzle_orm.relations)(listLikes, ({ one }) => ({
  lists: one(lists, {
    fields: [listLikes.listId],
    references: [lists.id]
  }),
  profile: one(profiles, {
    fields: [listLikes.profileId],
    references: [profiles.id]
  })
}));
var lists = (0, import_pg_core.pgTable)(
  "lists",
  {
    id: (0, import_pg_core.uuid)("id").$defaultFn(() => (0, import_node_crypto.randomUUID)()).primaryKey(),
    name: (0, import_pg_core.varchar)("name"),
    profileId: (0, import_pg_core.uuid)("profile_id").references(() => profiles.id, {
      onDelete: "cascade"
    }).notNull(),
    description: (0, import_pg_core.varchar)("description"),
    coverPath: (0, import_pg_core.varchar)("cover_path"),
    visibility: listVisibilityEnum("visibility").notNull(),
    createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow().notNull()
  },
  (table) => {
    return {
      profileId: (0, import_pg_core.index)("profile_id_idx").on(table.profileId)
    };
  }
);
var listRelations = (0, import_drizzle_orm.relations)(lists, ({ one, many }) => ({
  listItems: many(listItems),
  listLikes: many(listLikes),
  profiles: one(profiles, {
    fields: [lists.profileId],
    references: [profiles.id]
  })
}));
var profiles = (0, import_pg_core.pgTable)(
  "profiles",
  {
    id: (0, import_pg_core.uuid)("id").$defaultFn(() => (0, import_node_crypto.randomUUID)()).primaryKey(),
    email: (0, import_pg_core.varchar)("email").unique(),
    username: (0, import_pg_core.varchar)("username").unique().notNull(),
    bannerPath: (0, import_pg_core.varchar)("banner_path"),
    subscriptionType: subscriptionTypeEnum("subscription_type"),
    imagePath: (0, import_pg_core.varchar)("image_path").notNull(),
    createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow().notNull()
  },
  (table) => {
    return {
      email: (0, import_pg_core.index)("email_idx").on(table.email),
      username: (0, import_pg_core.index)("username_idx").on(table.username)
    };
  }
);
var profileRelations = (0, import_drizzle_orm.relations)(profiles, ({ one, many }) => ({
  subscriptions: many(subscriptions),
  likes: many(likes),
  listLikes: many(listLikes),
  lists: many(lists),
  reviewReplies: many(reviewReplies),
  reviews: many(reviews),
  followers: many(followers)
}));
var reviewReplies = (0, import_pg_core.pgTable)("review_replies", {
  id: (0, import_pg_core.uuid)("id").$defaultFn(() => (0, import_node_crypto.randomUUID)()).primaryKey(),
  createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow().notNull(),
  profileId: (0, import_pg_core.uuid)("profile_id").references(() => profiles.id, { onDelete: "cascade" }).notNull(),
  reply: (0, import_pg_core.varchar)("reply").notNull(),
  reviewId: (0, import_pg_core.uuid)("review_id").references(() => reviews.id, { onDelete: "cascade" }).notNull()
});
var reviewsRepliesRelations = (0, import_drizzle_orm.relations)(
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
var reviews = (0, import_pg_core.pgTable)("reviews", {
  id: (0, import_pg_core.uuid)("id").$defaultFn(() => (0, import_node_crypto.randomUUID)()).primaryKey(),
  createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow().notNull(),
  profileId: (0, import_pg_core.uuid)("profile_id").references(() => profiles.id, { onDelete: "cascade" }).notNull(),
  tmdbId: (0, import_pg_core.integer)("tmdb_id"),
  mediaType: mediaTypeEnum("media_type"),
  review: (0, import_pg_core.varchar)("review"),
  rating: (0, import_pg_core.integer)("rating"),
  hasSpoilers: (0, import_pg_core.boolean)("has_spoilers"),
  tmdbTitle: (0, import_pg_core.varchar)("tmdb_title"),
  tmdbPosterPath: (0, import_pg_core.varchar)("tmdb_poster_path"),
  tmdbOverview: (0, import_pg_core.varchar)("tmdb_overview"),
  language: languagesEnum("language")
});
var reviewsRelations = (0, import_drizzle_orm.relations)(reviews, ({ one, many }) => ({
  likes: many(likes),
  profiles: one(profiles, {
    fields: [reviews.profileId],
    references: [profiles.id]
  })
}));
var subscriptions = (0, import_pg_core.pgTable)("subscriptions", {
  id: (0, import_pg_core.uuid)("id").$defaultFn(() => (0, import_node_crypto.randomUUID)()).primaryKey(),
  profileId: (0, import_pg_core.uuid)("profile_id").references(() => profiles.id, { onDelete: "cascade" }).notNull(),
  type: subscriptionTypeEnum("type").notNull(),
  createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow().notNull()
});
var subscriptionsRelations = (0, import_drizzle_orm.relations)(subscriptions, ({ one }) => ({
  profile: one(profiles, {
    fields: [subscriptions.profileId],
    references: [profiles.id]
  })
}));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
//# sourceMappingURL=index.cjs.map