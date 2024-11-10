import type { FastifyReply, FastifyRequest } from 'fastify'
import { createWatchlistItemBodySchema } from '../schemas/watchlist'
import { createWatchlistItemService } from '@/domain/services/watchlist-item/create-watchlist-item'

export async function createWatchlistItemController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { tmdbId } = createWatchlistItemBodySchema.parse(request.body)

  const { watchlistItem } = await createWatchlistItemService({
    tmdbId,
    userId: request.user.id,
  })

  return reply.status(201).send({ watchlistItem })
}
