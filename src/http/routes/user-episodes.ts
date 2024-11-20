import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { verifyJwt } from '../middlewares/verify-jwt'
import { createUserEpisodeController } from '../controllers/user-episodes-controller'
import {
  createUserEpisodeBodySchema,
  createUserEpisodeResponseSchema,
} from '../schemas/user-episodes'

const USER_EPISODES_TAGS = ['User episodes']

export async function userEpisodesRoutes(app: FastifyInstance) {
  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'POST',
      url: '/user/episodes',
      onRequest: [verifyJwt],
      schema: {
        description: 'Create user episode',
        tags: USER_EPISODES_TAGS,
        body: createUserEpisodeBodySchema,
        response: createUserEpisodeResponseSchema,
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      handler: createUserEpisodeController,
    })
  )
}
