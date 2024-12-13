import type { GetUserActivitiesResponseType } from '@/http/schemas/user-activities'
import { getTMDBDataService } from '../tmdb/get-tmdb-data'
import type { FastifyRedis } from '@fastify/redis'
import type { Language } from '@plotwist_app/tmdb'

export type FormatUserActivitiesInput = {
  redis: FastifyRedis
  language: Language
} & GetUserActivitiesResponseType

export async function formatUserActivitiesService({
  userActivities,
  redis,
  language,
}: FormatUserActivitiesInput) {
  const formatted = await Promise.all(
    userActivities.map(async activity => {
      if (
        activity.activityType === 'ADD_ITEM' ||
        activity.activityType === 'DELETE_ITEM' ||
        activity.activityType === 'CHANGE_STATUS' ||
        activity.activityType === 'CREATE_REVIEW' ||
        activity.activityType === 'LIKE_REVIEW'
      ) {
        const { mediaType, tmdbId } = activity.additionalInfo

        const { title } = await getTMDBDataService(redis, {
          language,
          mediaType,
          tmdbId,
        })

        return {
          ...activity,
          additionalInfo: {
            ...activity.additionalInfo,
            title,
          },
        }
      }

      return activity
    })
  )

  return { userActivities: formatted }
}
