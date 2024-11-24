import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { verifyJwt } from '../middlewares/verify-jwt'

import {
  createLikeBodySchema,
  createLikeResponseSchema,
  deleteLikeParamsSchema,
} from '../schemas/likes'
import {
  createLikeController,
  deleteLikeController,
} from '../controllers/like-controller'

export async function likesRoutes(app: FastifyInstance) {
  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'POST',
      url: '/like',
      onRequest: [verifyJwt],
      schema: {
        description: 'Create like',
        tags: ['Like'],
        body: createLikeBodySchema,
        response: createLikeResponseSchema,
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      handler: createLikeController,
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'DELETE',
      url: '/like/:id',
      onRequest: [verifyJwt],
      schema: {
        description: 'Delete like',
        tags: ['Like'],
        params: deleteLikeParamsSchema,
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      handler: deleteLikeController,
    })
  )
}
