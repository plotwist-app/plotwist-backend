import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { getUserStatsController } from '../controllers/user-stats'
import {
  getUserStatsParamsSchema,
  getUserStatsResponseSchema,
} from '../schemas/user-stats'

const USER_STATS_TAG = ['User stats']

export async function userStatsRoutes(app: FastifyInstance) {
  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'GET',
      url: '/user/stats/:id',
      schema: {
        description: 'Get user stats',
        params: getUserStatsParamsSchema,
        response: getUserStatsResponseSchema,
        tags: USER_STATS_TAG,
      },
      handler: getUserStatsController,
    })
  )
}
