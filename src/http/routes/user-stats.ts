import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
  getUserStatsController,
  getUserTotalHoursController,
  getUserReviewsCountController,
} from '../controllers/user-stats'
import {
  getUserDefaultSchema,
  getUserReviewsCountResponseSchema,
  getUserStatsResponseSchema,
  getUserTotalHoursResponseSchema,
} from '../schemas/user-stats'

const USER_STATS_TAG = ['User stats']

export async function userStatsRoutes(app: FastifyInstance) {
  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'GET',
      url: '/user/:id/stats',
      schema: {
        description: 'Get user stats',
        params: getUserDefaultSchema,
        response: getUserStatsResponseSchema,
        tags: USER_STATS_TAG,
      },
      handler: getUserStatsController,
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'GET',
      url: '/user/:id/total-hours',
      schema: {
        description: 'Get user total hours',
        params: getUserDefaultSchema,
        response: getUserTotalHoursResponseSchema,
        tags: USER_STATS_TAG,
      },
      handler: (request, reply) =>
        getUserTotalHoursController(request, reply, app.redis),
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'GET',
      url: '/user/:id/reviews-count',
      schema: {
        description: 'Get user reviews count',
        params: getUserDefaultSchema,
        response: getUserReviewsCountResponseSchema,
        tags: USER_STATS_TAG,
      },
      handler: getUserReviewsCountController,
    })
  )
}
