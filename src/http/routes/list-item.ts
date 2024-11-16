import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { verifyJwt } from '../middlewares/verify-jwt'

import {
  createListItemBodySchema,
  createListItemResponseSchema,
  deleteListItemParamSchema,
  getListItemsParamsSchema,
  getListItemsResponseSchema,
} from '../schemas/list-item'

import {
  createListItemController,
  deleteListItemController,
  getListItemsController,
} from '../controllers/list-item-controller'
import { languageQuerySchema } from '../schemas/common'

export async function listItemRoute(app: FastifyInstance) {
  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'POST',
      url: '/list-item',
      onRequest: [verifyJwt],
      schema: {
        description: 'Create list item',
        tags: ['List Item'],
        body: createListItemBodySchema,
        response: createListItemResponseSchema,
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      handler: createListItemController,
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'GET',
      url: '/list-items/by/:listId',
      schema: {
        description: 'Create list item',
        tags: ['List Item'],
        params: getListItemsParamsSchema,
        querystring: languageQuerySchema,
        response: getListItemsResponseSchema,
      },
      handler: (req, reply) => getListItemsController(req, reply, app.redis),
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'DELETE',
      url: '/list-item/:id',
      onRequest: [verifyJwt],
      schema: {
        description: 'Delete list item',
        tags: ['List Item'],
        params: deleteListItemParamSchema,
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      handler: deleteListItemController,
    })
  )
}
