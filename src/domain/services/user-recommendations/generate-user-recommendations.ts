import { getProUsersDetailsService } from '@/domain/services/users/get-pro-users'
import { getUserPreferencesService } from '@/domain/services/user-preferences/get-user-preferences'
import { getUserBestReviewsService } from '@/domain/services/user-stats/get-user-best-reviews'
import { getLanguageByWatchRegion } from '@/utils/language'
import type { FastifyRedis } from '@fastify/redis'
import { getUserRecommendationsService } from './get-user-recommendations'
import { sendUserRecommendationsEmailService } from './send-user-recommendations-email'
import { logger } from '@/adapters/logger'

export async function generateUserRecommendationsService(redis: FastifyRedis) {
  try {
    const { users } = await getProUsersDetailsService()

    for (const user of users) {
      const [{ userPreferences }, { bestReviews }] = await Promise.all([
        getUserPreferencesService({ userId: user.id }),
        getUserBestReviewsService({
          userId: user.id,
          language: 'en-US',
          redis,
        }),
      ])

      const language = getLanguageByWatchRegion(userPreferences?.watchRegion)

      const { recommendations } = await getUserRecommendationsService({
        redis,
        language,
        userId: user.id,
        bestReviews,
        userPreferences,
      })

      await sendUserRecommendationsEmailService({
        recommendations,
        user,
        language,
      })

      logger.info(`Successfully sent recommendations email to user ${user.id}`)
    }

    logger.info('Finished user recommendations generation process')
  } catch (error) {
    logger.error('Error generating user recommendations:', error)
    throw error
  }
}
