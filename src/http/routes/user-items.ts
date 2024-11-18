import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { verifyJwt } from '../middlewares/verify-jwt'
import {
  createUserItemBodySchema,
  createUserItemResponseSchema,
  deleteUserItemParamsSchema,
  getUserItemQuerySchema,
  getUserItemResponseSchema,
  getUserItemsQuerySchema,
  getUserItemsResponseSchema,
  updateUserItemStatusBodySchema,
  updateUserItemStatusParamsSchema,
  updateUserItemStatusResponseSchema,
} from '../schemas/user-items'

import {
  createUserItemController,
  deleteUserItemController,
  getUserItemController,
  getUserItemsController,
  updateUserItemStatusController,
} from '../controllers/user-items-controller'

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
        response: createUserItemResponseSchema,
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
      schema: {
        description: 'Get user items',
        tags: USER_ITEMS_TAGS,
        querystring: getUserItemsQuerySchema,
        response: getUserItemsResponseSchema,
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

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'GET',
      url: '/user/item',
      onRequest: [verifyJwt],
      schema: {
        description: 'Get user item',
        tags: USER_ITEMS_TAGS,
        querystring: getUserItemQuerySchema,
        response: getUserItemResponseSchema,
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      handler: getUserItemController,
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'PATCH',
      url: '/user/item/status/by/:id',
      onRequest: [verifyJwt],
      schema: {
        description: 'Get user item',
        tags: USER_ITEMS_TAGS,
        params: updateUserItemStatusParamsSchema,
        body: updateUserItemStatusBodySchema,
        response: updateUserItemStatusResponseSchema,
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      handler: updateUserItemStatusController,
    })
  )
}
