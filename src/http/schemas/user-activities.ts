import { schema } from '@/db/schema'
import { createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { languageQuerySchema } from './common'

export const getUserActivitiesParamsSchema = z.object({
  userId: z.string(),
})

export const getUserActivitiesQuerySchema = z
  .object({
    cursor: z.string().optional(),
    pageSize: z.string().default('10'),
  })
  .merge(languageQuerySchema)

const getUserActivity = createSelectSchema(schema.userActivities).omit({
  activityType: true,
  entityType: true,
  entityId: true,
}).shape

export const getUserActivitiesResponseSchema = {
  200: z.object({
    userActivities: z.array(
      z.discriminatedUnion('activityType', [
        z.object({
          ...getUserActivity,
          activityType: z.enum(['ADD_ITEM', 'DELETE_ITEM']),
          entityType: z.enum(['LIST']),
          entityId: z.string(),
          additionalInfo: z.object({
            tmdbId: z.number(),
            mediaType: z.enum(['TV_SHOW', 'MOVIE']),
            listId: z.string().nullable(),
            listTitle: z.string().nullable(),
            title: z.string(),
          }),
        }),
        z.object({
          ...getUserActivity,
          activityType: z.enum(['FOLLOW_USER', 'UNFOLLOW_USER']),
          entityType: z.null(),
          entityId: z.null(),
          additionalInfo: z.object({
            id: z.string(),
            username: z.string(),
            avatarUrl: z.string().nullable(),
          }),
        }),
        z.object({
          ...getUserActivity,
          activityType: z.enum(['CREATE_LIST', 'LIKE_LIST']),
          entityType: z.enum(['LIST']),
          entityId: z.string(),
          additionalInfo: z.object({
            id: z.string(),
            title: z.string(),
          }),
        }),
        z.object({
          ...getUserActivity,
          activityType: z.enum(['LIKE_REVIEW', 'CREATE_REVIEW']),
          entityType: z.enum(['REVIEW']),
          entityId: z.string(),
          additionalInfo: z.object({
            id: z.string(),
            review: z.string(),
            rating: z.number(),
            tmdbId: z.number(),
            mediaType: z.enum(['TV_SHOW', 'MOVIE']),
            title: z.string(),
            author: z.object({
              id: z.string(),
              username: z.string(),
              avatarUrl: z.string().nullable(),
            }),
            seasonNumber: z.number().nullable(),
            episodeNumber: z.number().nullable(),
          }),
        }),
        z.object({
          ...getUserActivity,
          activityType: z.enum(['LIKE_REPLY', 'CREATE_REPLY']),
          entityType: z.enum(['REPLY']),
          entityId: z.string(),
          additionalInfo: z.object({
            id: z.string(),
            reply: z.string(),
            review: z.object({
              id: z.string(),
              review: z.string(),
              rating: z.number(),
              tmdbId: z.number(),
              mediaType: z.enum(['TV_SHOW', 'MOVIE']),
              title: z.string(),
              author: z.object({
                id: z.string(),
                username: z.string(),
                avatarUrl: z.string().nullable(),
              }),
              seasonNumber: z.number().nullable(),
              episodeNumber: z.number().nullable(),
            }),
          }),
        }),
        z.object({
          ...getUserActivity,
          activityType: z.literal('WATCH_EPISODE'),
          entityType: z.null(),
          entityId: z.null(),
          additionalInfo: z.object({
            episodes: z.array(
              z.object({
                tmdbId: z.number(),
                seasonNumber: z.number(),
                episodeNumber: z.number(),
                runtime: z.number(),
              })
            ),
            title: z.string(),
            tmdbId: z.number(),
          }),
        }),
        z.object({
          ...getUserActivity,
          activityType: z.literal('CHANGE_STATUS'),
          entityType: z.null(),
          entityId: z.null(),
          additionalInfo: z.object({
            tmdbId: z.number(),
            mediaType: z.enum(['TV_SHOW', 'MOVIE']),
            status: z.string(),
            title: z.string(),
          }),
        }),
        z.object({
          ...getUserActivity,
          activityType: z.literal('CREATE_ACCOUNT'),
          entityType: z.null(),
          entityId: z.null(),
        }),
      ])
    ),
    nextCursor: z.string().nullable(),
  }),
}

const getUserActivitiesResponseType = getUserActivitiesResponseSchema[200]._type
export type GetUserActivitiesResponseType = typeof getUserActivitiesResponseType

export const deleteUserActivityParamsSchema = z.object({
  activityId: z.string(),
})
