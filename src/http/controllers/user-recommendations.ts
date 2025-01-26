import type { FastifyReply, FastifyRequest } from 'fastify'

import { getUserRecommendationsService } from '@/domain/services/user-recommendations/get-user-recommendations'
import { getUserPreferencesService } from '@/domain/services/user-preferences/get-user-preferences'
import { getUserBestReviewsService } from '@/domain/services/user-stats/get-user-best-reviews'
import type { FastifyRedis } from '@fastify/redis'
import { getProUsersDetailsService } from '@/domain/services/users/get-pro-users'
import { getLanguageByWatchRegion } from '@/utils/language'
import { sendUserRecommendationsEmailService } from '@/domain/services/user-recommendations/send-user-recommendations-email'

export async function sendUserRecommendationsEmailController(
  _request: FastifyRequest,
  reply: FastifyReply,
  redis: FastifyRedis
) {
  const { users } = await getProUsersDetailsService()

  for (const user of users) {
    console.log({ user })
    if (user.email === '7henrique18@gmail.com') {
      const [{ userPreferences }, { bestReviews }] = await Promise.all([
        getUserPreferencesService({ userId: user.id }),
        getUserBestReviewsService({
          userId: user.id,
          language: 'en-US', // Tanto faz.
          redis,
        }),
      ])

      const language = getLanguageByWatchRegion(userPreferences.watchRegion)

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
    }
  }

  return reply.status(200).send({
    message: 'Email sent',
  })
}
