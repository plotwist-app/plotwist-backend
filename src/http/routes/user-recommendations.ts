import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { sendUserRecommendationsEmailController } from '../controllers/user-recommendations'

const USER_RECOMMENDATIONS_TAG = ['User recommendations']

export async function userRecommendationsRoutes(app: FastifyInstance) {
  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'POST',
      url: '/user/recommendations/email',
      schema: {
        tags: USER_RECOMMENDATIONS_TAG,
      },
      handler: (request, reply) =>
        sendUserRecommendationsEmailController(request, reply, app.redis),
    })
  )
}
