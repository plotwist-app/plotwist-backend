import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
  createListController,
  deleteListController,
  getListController,
  getListsController,
  updateListBannerController,
  updateListController,
} from '../controllers/list-controller'
import { verifyJwt } from '../middlewares/verify-jwt'
import { verifyOptionalJwt } from '../middlewares/verify-optional-jwt'
import {
  createListBodySchema,
  createListResponseSchema,
  deleteListParamsSchema,
  deleteListResponseSchema,
  getListParamsSchema,
  getListResponseSchema,
  getListsQuerySchema,
  getListsResponseSchema,
  updateListBannerBodySchema,
  updateListBodySchema,
  updateListParamsSchema,
  updateListResponseSchema,
} from '../schemas/lists'

export async function listsRoute(app: FastifyInstance) {
  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'POST',
      url: '/list',
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
      onRequest: [verifyOptionalJwt],
      schema: {
        description: 'Get lists',
        tags: ['List'],
        querystring: getListsQuerySchema,
        response: getListsResponseSchema,
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      handler: getListsController,
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'DELETE',
      url: '/list/:id',
      onRequest: [verifyJwt],
      schema: {
        description: 'Delete list',
        tags: ['List'],
        params: deleteListParamsSchema,
        response: deleteListResponseSchema,
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      handler: deleteListController,
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'PUT',
      url: '/list/:id',
      onRequest: [verifyJwt],
      schema: {
        description: 'Update list',
        tags: ['List'],
        params: updateListParamsSchema,
        body: updateListBodySchema,
        response: updateListResponseSchema,
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      handler: updateListController,
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'GET',
      url: '/list/by/:id',
      onRequest: [verifyOptionalJwt],
      schema: {
        description: 'Get list by ID',
        tags: ['List'],
        params: getListParamsSchema,
        response: getListResponseSchema,
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      handler: getListController,
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'PATCH',
      url: '/list/banner',
      onRequest: [verifyOptionalJwt],
      schema: {
        description: 'Update list banner by ID',
        tags: ['List'],
        body: updateListBannerBodySchema,
        response: getListResponseSchema,
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      handler: updateListBannerController,
    })
  )
}
