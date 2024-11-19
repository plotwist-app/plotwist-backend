import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { verifyJwt } from '../middlewares/verify-jwt'
import { createUserEpisodesController } from '../controllers/user-episodes-controller'

const USER_EPISODES_TAGS = ['User episodes']

export async function userEpisodesRoutes(app: FastifyInstance) {
  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'POST',
      url: '/user/episodes',
      onRequest: [verifyJwt],
      schema: {
        description: 'Create user item',
        tags: USER_EPISODES_TAGS,
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      handler: createUserEpisodesController,
    })
  )
}
