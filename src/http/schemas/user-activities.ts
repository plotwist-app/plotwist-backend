import { schema } from '@/db/schema'
import { createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const getUserActivitiesParamsSchema = z.object({
  userId: z.string(),
})

const getUserActivity = createSelectSchema(schema.userActivities).omit({
  activityType: true,
}).shape

export const getUserActivitiesResponseSchema = {
  200: z.object({
    userActivities: z.array(
      z.discriminatedUnion('activityType', [
        z.object({
          ...getUserActivity,
          activityType: z.enum(['ADD_ITEM', 'DELETE_ITEM']),
          additionalInfo: z.object({
            tmdbId: z.number(),
            mediaType: z.string(),
            listId: z.string().nullable(),
            listTitle: z.string().nullable(),
          }),
        }),
        z.object({
          ...getUserActivity,
          activityType: z.enum(['FOLLOW_USER', 'UNFOLLOW_USER']),
          additionalInfo: z.object({
            id: z.string(),
            username: z.string(),
            bannerUrl: z.string().nullable(),
          }),
        }),
        z.object({
          ...getUserActivity,
          activityType: z.enum(['CREATE_LIST', 'DELETE_LIST']),
          additionalInfo: z.object({
            id: z.string(),
            title: z.string(),
          }),
        }),
        z.object({
          ...getUserActivity,
          activityType: z.enum(['LIKE_REVIEW', 'CREATE_REVIEW']),
          additionalInfo: z.object({
            id: z.string(),
            review: z.string(),
            rating: z.number(),
            tmdbId: z.number(),
            mediaType: z.string(),
          }),
        }),
        z.object({
          ...getUserActivity,
          activityType: z.enum(['LIKE_REPLY', 'CREATE_REPLY']),
          additionalInfo: z.object({
            id: z.string(),
            reply: z.string(),
          }),
        }),
        z.object({
          ...getUserActivity,
          activityType: z.literal('WATCH_EPISODE'),
          additionalInfo: z.object({
            episodes: z.array(z.object({})),
          }),
        }),
        z.object({
          ...getUserActivity,
          activityType: z.literal('CHANGE_STATUS'),
          additionalInfo: z.object({
            tmdbId: z.number(),
            mediaType: z.string(),
            status: z.string(),
          }),
        }),
      ])
    ),
  }),
}
