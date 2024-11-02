import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { verifyJwt } from '../middlewares/verify-jwt'
import {
  createListBodySchema,
  createListResponseSchema,
} from '../schemas/lists'
import { createListController } from '../controllers/list-controller'

export async function listsRoute(app: FastifyInstance) {
  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'POST',
      url: '/create-list',
      onRequest: [verifyJwt],
      schema: {
        description: 'Register a list',
        tags: ['List'],
        body: createListBodySchema,
        response: createListResponseSchema,
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      handler: createListController,
    })
  )
}
