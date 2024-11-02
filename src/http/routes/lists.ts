import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { verifyJwt } from '../middlewares/verify-jwt'
import {
  createListBodySchema,
  createListResponseSchema,
  getListsQuerySchema,
  getListsResponseSchema,
} from '../schemas/lists'
import {
  createListController,
  getListsController,
} from '../controllers/list-controller'

export async function listsRoute(app: FastifyInstance) {
  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'POST',
      url: '/create-list',
      onRequest: [verifyJwt],
      schema: {
        description: 'Create a list',
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

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'GET',
      url: '/lists',
      schema: {
        description: 'Get lists',
        tags: ['List'],
        querystring: getListsQuerySchema,
        response: getListsResponseSchema,
      },
      handler: getListsController,
    })
  )
}
