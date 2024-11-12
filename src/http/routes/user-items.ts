import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { verifyJwt } from '../middlewares/verify-jwt'
import {
  createUserItemBodySchema,
  deleteUserItemParamsSchema,
  getUserItemsQuerySchema,
  getUserItemsResponseSchema,
} from '../schemas/user-items'

import {
  createUserItemController,
  deleteUserItemController,
  getUserItemsController,
} from '../controllers/user-items-controller'

import { languageQuerySchema } from '../schemas/common'
import { createListItemResponseSchema } from '../schemas/list-item'

const USER_ITEMS_TAGS = ['User items']

export async function userItemsRoutes(app: FastifyInstance) {
  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'POST',
      url: '/user/item',
      onRequest: [verifyJwt],
      schema: {
        description: 'Create user item',
        tags: USER_ITEMS_TAGS,
        body: createUserItemBodySchema,
        response: createListItemResponseSchema,
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      handler: createUserItemController,
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'GET',
      url: '/user/items',
      onRequest: [verifyJwt],
      schema: {
        description: 'Get user items',
        tags: USER_ITEMS_TAGS,
        querystring: getUserItemsQuerySchema,
        response: getUserItemsResponseSchema,
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      handler: (request, reply) =>
        getUserItemsController(request, reply, app.redis),
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'DELETE',
      url: '/user/item/:id',
      onRequest: [verifyJwt],
      schema: {
        description: 'Delete user item',
        tags: USER_ITEMS_TAGS,
        params: deleteUserItemParamsSchema,
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      handler: deleteUserItemController,
    })
  )
}
