import { relations } from 'drizzle-orm/relations'
import {
  flowStateInAuth,
  followers,
  identitiesInAuth,
  likes,
  listItems,
  listLikes,
  lists,
  mfaAmrClaimsInAuth,
  mfaChallengesInAuth,
  mfaFactorsInAuth,
  oneTimeTokensInAuth,
  profiles,
  recommendations,
  refreshTokensInAuth,
  reviewReplies,
  reviews,
  samlProvidersInAuth,
  samlRelayStatesInAuth,
  sessionsInAuth,
  ssoDomainsInAuth,
  ssoProvidersInAuth,
  subscriptions,
  usersInAuth,
  watchListItems,
  watchedListItems,
} from './schema'

export const samlProvidersInAuthRelations = relations(
  samlProvidersInAuth,
  ({ one }) => ({
    ssoProvidersInAuth: one(ssoProvidersInAuth, {
      fields: [samlProvidersInAuth.ssoProviderId],
      references: [ssoProvidersInAuth.id],
    }),
  })
)

export const ssoProvidersInAuthRelations = relations(
  ssoProvidersInAuth,
  ({ many }) => ({
    samlProvidersInAuths: many(samlProvidersInAuth),
    samlRelayStatesInAuths: many(samlRelayStatesInAuth),
    ssoDomainsInAuths: many(ssoDomainsInAuth),
  })
)

export const samlRelayStatesInAuthRelations = relations(
  samlRelayStatesInAuth,
  ({ one }) => ({
    flowStateInAuth: one(flowStateInAuth, {
      fields: [samlRelayStatesInAuth.flowStateId],
      references: [flowStateInAuth.id],
    }),
    ssoProvidersInAuth: one(ssoProvidersInAuth, {
      fields: [samlRelayStatesInAuth.ssoProviderId],
      references: [ssoProvidersInAuth.id],
    }),
  })
)

export const flowStateInAuthRelations = relations(
  flowStateInAuth,
  ({ many }) => ({
    samlRelayStatesInAuths: many(samlRelayStatesInAuth),
  })
)

export const identitiesInAuthRelations = relations(
  identitiesInAuth,
  ({ one }) => ({
    usersInAuth: one(usersInAuth, {
      fields: [identitiesInAuth.userId],
      references: [usersInAuth.id],
    }),
  })
)

export const usersInAuthRelations = relations(usersInAuth, ({ many }) => ({
  identitiesInAuths: many(identitiesInAuth),
  sessionsInAuths: many(sessionsInAuth),
  mfaFactorsInAuths: many(mfaFactorsInAuth),
  oneTimeTokensInAuths: many(oneTimeTokensInAuth),
  profiles: many(profiles),
}))

export const sessionsInAuthRelations = relations(
  sessionsInAuth,
  ({ one, many }) => ({
    usersInAuth: one(usersInAuth, {
      fields: [sessionsInAuth.userId],
      references: [usersInAuth.id],
    }),
    refreshTokensInAuths: many(refreshTokensInAuth),
    mfaAmrClaimsInAuths: many(mfaAmrClaimsInAuth),
  })
)

export const refreshTokensInAuthRelations = relations(
  refreshTokensInAuth,
  ({ one }) => ({
    sessionsInAuth: one(sessionsInAuth, {
      fields: [refreshTokensInAuth.sessionId],
      references: [sessionsInAuth.id],
    }),
  })
)

export const mfaFactorsInAuthRelations = relations(
  mfaFactorsInAuth,
  ({ one, many }) => ({
    usersInAuth: one(usersInAuth, {
      fields: [mfaFactorsInAuth.userId],
      references: [usersInAuth.id],
    }),
    mfaChallengesInAuths: many(mfaChallengesInAuth),
  })
)

export const oneTimeTokensInAuthRelations = relations(
  oneTimeTokensInAuth,
  ({ one }) => ({
    usersInAuth: one(usersInAuth, {
      fields: [oneTimeTokensInAuth.userId],
      references: [usersInAuth.id],
    }),
  })
)

export const mfaAmrClaimsInAuthRelations = relations(
  mfaAmrClaimsInAuth,
  ({ one }) => ({
    sessionsInAuth: one(sessionsInAuth, {
      fields: [mfaAmrClaimsInAuth.sessionId],
      references: [sessionsInAuth.id],
    }),
  })
)

export const mfaChallengesInAuthRelations = relations(
  mfaChallengesInAuth,
  ({ one }) => ({
    mfaFactorsInAuth: one(mfaFactorsInAuth, {
      fields: [mfaChallengesInAuth.factorId],
      references: [mfaFactorsInAuth.id],
    }),
  })
)

export const ssoDomainsInAuthRelations = relations(
  ssoDomainsInAuth,
  ({ one }) => ({
    ssoProvidersInAuth: one(ssoProvidersInAuth, {
      fields: [ssoDomainsInAuth.ssoProviderId],
      references: [ssoProvidersInAuth.id],
    }),
  })
)

export const followersRelations = relations(followers, ({ one }) => ({
  profile_followedId: one(profiles, {
    fields: [followers.followedId],
    references: [profiles.id],
    relationName: 'followers_followedId_profiles_id',
  }),
  profile_followerId: one(profiles, {
    fields: [followers.followerId],
    references: [profiles.id],
    relationName: 'followers_followerId_profiles_id',
  }),
}))

export const profilesRelations = relations(profiles, ({ one, many }) => ({
  followers_followedId: many(followers, {
    relationName: 'followers_followedId_profiles_id',
  }),
  followers_followerId: many(followers, {
    relationName: 'followers_followerId_profiles_id',
  }),
  usersInAuth: one(usersInAuth, {
    fields: [profiles.id],
    references: [usersInAuth.id],
  }),
  listLikes: many(listLikes),
  recommendations_receiverUserId: many(recommendations, {
    relationName: 'recommendations_receiverUserId_profiles_id',
  }),
  recommendations_senderUserId: many(recommendations, {
    relationName: 'recommendations_senderUserId_profiles_id',
  }),
  reviews: many(reviews),
  watchedListItems: many(watchedListItems),
  likes: many(likes),
  lists: many(lists),
  reviewReplies: many(reviewReplies),
  subscriptions: many(subscriptions),
  watchListItems: many(watchListItems),
}))

export const listLikesRelations = relations(listLikes, ({ one }) => ({
  list: one(lists, {
    fields: [listLikes.listId],
    references: [lists.id],
  }),
  profile: one(profiles, {
    fields: [listLikes.userId],
    references: [profiles.id],
  }),
}))

export const listsRelations = relations(lists, ({ one, many }) => ({
  listLikes: many(listLikes),
  profile: one(profiles, {
    fields: [lists.userId],
    references: [profiles.id],
  }),
  listItems: many(listItems),
}))

export const recommendationsRelations = relations(
  recommendations,
  ({ one }) => ({
    profile_receiverUserId: one(profiles, {
      fields: [recommendations.receiverUserId],
      references: [profiles.id],
      relationName: 'recommendations_receiverUserId_profiles_id',
    }),
    profile_senderUserId: one(profiles, {
      fields: [recommendations.senderUserId],
      references: [profiles.id],
      relationName: 'recommendations_senderUserId_profiles_id',
    }),
  })
)

export const reviewsRelations = relations(reviews, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [reviews.userId],
    references: [profiles.id],
  }),
  likes: many(likes),
  reviewReplies: many(reviewReplies),
}))

export const watchedListItemsRelations = relations(
  watchedListItems,
  ({ one }) => ({
    profile: one(profiles, {
      fields: [watchedListItems.userId],
      references: [profiles.id],
    }),
  })
)

export const likesRelations = relations(likes, ({ one }) => ({
  review: one(reviews, {
    fields: [likes.reviewId],
    references: [reviews.id],
  }),
  reviewReply: one(reviewReplies, {
    fields: [likes.reviewReplyId],
    references: [reviewReplies.id],
  }),
  profile: one(profiles, {
    fields: [likes.userId],
    references: [profiles.id],
  }),
}))

export const reviewRepliesRelations = relations(
  reviewReplies,
  ({ one, many }) => ({
    likes: many(likes),
    review: one(reviews, {
      fields: [reviewReplies.reviewId],
      references: [reviews.id],
    }),
    profile: one(profiles, {
      fields: [reviewReplies.userId],
      references: [profiles.id],
    }),
  })
)

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  profile: one(profiles, {
    fields: [subscriptions.userId],
    references: [profiles.id],
  }),
}))

export const watchListItemsRelations = relations(watchListItems, ({ one }) => ({
  profile: one(profiles, {
    fields: [watchListItems.userId],
    references: [profiles.id],
  }),
}))

export const listItemsRelations = relations(listItems, ({ one }) => ({
  list: one(lists, {
    fields: [listItems.listId],
    references: [lists.id],
  }),
}))
