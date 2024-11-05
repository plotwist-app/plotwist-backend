import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { verifyJwt } from '../middlewares/verify-jwt'

import {
  createListItemBodySchema,
  createListItemResponseSchema,
  getListItemsParamsSchema,
  getListItemsResponseSchema,
} from '../schemas/list-item'
import {
  createListItemController,
  getListItemsController,
} from '../controllers/list-item-controller'
import { getListItemsService } from '@/app/domain/services/list-item/get-list-items'

export async function listItemRoutes(app: FastifyInstance) {
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
        response: getListItemsResponseSchema,
      },
      handler: getListItemsController,
    })
  )
}
