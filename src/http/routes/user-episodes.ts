import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { verifyJwt } from '../middlewares/verify-jwt'
import {
  createUserEpisodeController,
  deleteUserEpisodeController,
  getUserEpisodesController,
} from '../controllers/user-episodes-controller'
import {
  createUserEpisodeBodySchema,
  createUserEpisodeResponseSchema,
  deleteUserEpisodeParamsSchema,
  deleteUserEpisodeResponseSchema,
  getUserEpisodesQuerySchema,
  getUserEpisodesResponseSchema,
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

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'GET',
      url: '/user/episodes',
      onRequest: [verifyJwt],
      schema: {
        description: 'Get user episode',
        tags: USER_EPISODES_TAGS,
        querystring: getUserEpisodesQuerySchema,
        response: getUserEpisodesResponseSchema,
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      handler: getUserEpisodesController,
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'DELETE',
      url: '/user/episodes/:id',
      onRequest: [verifyJwt],
      schema: {
        description: 'Delete user episode',
        tags: USER_EPISODES_TAGS,
        params: deleteUserEpisodeParamsSchema,
        response: deleteUserEpisodeResponseSchema,
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      handler: deleteUserEpisodeController,
    })
  )
}
