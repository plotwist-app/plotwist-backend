import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { verifyJwt } from '../middlewares/verify-jwt'
import { createWatchlistItemBodySchema } from '../schemas/watchlist'
import { createWatchlistItemController } from '../controllers/watchlist-controller'

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
}
