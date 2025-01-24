import type { FastifyReply, FastifyRequest } from 'fastify'
import { getUserRecommendationsSchema } from '../schemas/user-recommendations'

import { getUserRecommendationsService } from '@/domain/services/user-recommendations/get-user-recommendations'
import { getUserPreferencesService } from '@/domain/services/user-preferences/get-user-preferences'
import { getUserBestReviewsService } from '@/domain/services/user-stats/get-user-best-reviews'
import type { FastifyRedis } from '@fastify/redis'

export async function getUserRecommendationsController(
  request: FastifyRequest,
  reply: FastifyReply,
  redis: FastifyRedis
) {
  const { userId, language } = getUserRecommendationsSchema.parse(request.query)

  const { userPreferences } = await getUserPreferencesService({ userId })
  const { bestReviews } = await getUserBestReviewsService({
    userId,
    language,
    redis,
  })

  const { recommendations } = await getUserRecommendationsService({
    redis,
    userPreferences,
    bestReviews,
    language,
    userId,
  })

  return reply.status(200).send({
    recommendations,
  })
}
