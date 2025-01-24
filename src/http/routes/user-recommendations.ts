import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { getUserRecommendationsController } from '../controllers/user-recommendations'
import { getUserRecommendationsSchema } from '../schemas/user-recommendations'

const USER_RECOMMENDATIONS_TAG = ['User recommendations']

export async function userRecommendationsRoutes(app: FastifyInstance) {
  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'GET',
      url: '/user/recommendations',
      schema: {
        tags: USER_RECOMMENDATIONS_TAG,
        operationId: 'getUserRecommendations',
        querystring: getUserRecommendationsSchema,
      },
      handler: (request, reply) =>
        getUserRecommendationsController(request, reply, app.redis),
    })
  )
}
