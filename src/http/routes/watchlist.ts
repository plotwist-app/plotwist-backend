import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { verifyJwt } from '../middlewares/verify-jwt'
import {
  createWatchlistItemBodySchema,
  getWatchlistItemsResponseSchema,
} from '../schemas/watchlist'
import {
  createWatchlistItemController,
  getWatchlistItemsController,
} from '../controllers/watchlist-controller'
import { languageQuerySchema } from '../schemas/common'

const WATCHLIST_TAGS = ['Watchlist']

export async function watchlistRoutes(app: FastifyInstance) {
  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'POST',
      url: '/watchlist/item',
      onRequest: [verifyJwt],
      schema: {
        description: 'Create watchlist item',
        tags: WATCHLIST_TAGS,
        body: createWatchlistItemBodySchema,
        // response: createListItemResponseSchema,
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      handler: createWatchlistItemController,
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'GET',
      url: '/watchlist/items',
      onRequest: [verifyJwt],
      schema: {
        description: 'Get watchlist items',
        tags: WATCHLIST_TAGS,
        querystring: languageQuerySchema,
        response: getWatchlistItemsResponseSchema,
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      handler: (request, reply) =>
        getWatchlistItemsController(request, reply, app.redis),
    })
  )
}
