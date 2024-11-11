import type { FastifyReply, FastifyRequest } from 'fastify'
import { createWatchlistItemBodySchema } from '../schemas/watchlist'
import { createWatchlistItemService } from '@/domain/services/watchlist-item/create-watchlist-item'
import { DomainError } from '@/domain/errors/domain-error'
import { getWatchlistItemsService } from '@/domain/services/watchlist-item/get-watchlist-items'
import { getTMDBDataService } from '@/domain/services/tmdb/get-tmdb-data'
import type { FastifyRedis } from '@fastify/redis'
import { languageQuerySchema } from '../schemas/common'

export async function createWatchlistItemController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { tmdbId, mediaType } = createWatchlistItemBodySchema.parse(
    request.body
  )

  const result = await createWatchlistItemService({
    tmdbId,
    mediaType,
    userId: request.user.id,
  })

  if (result instanceof DomainError) {
    return reply.status(result.status).send({ message: result.message })
  }

  return reply.status(201).send({ watchlistItem: result.watchlistItem })
}

export async function getWatchlistItemsController(
  request: FastifyRequest,
  reply: FastifyReply,
  redis: FastifyRedis
) {
  const { language } = languageQuerySchema.parse(request.query)

  const result = await getWatchlistItemsService({
    userId: request.user.id,
  })

  const formatted = await Promise.all(
    result.watchlistItems.map(async item => {
      const tmdbData = await getTMDBDataService(redis, {
        mediaType: item.mediaType,
        tmdbId: item.tmdbId,
        language,
      })

      return { ...item, ...tmdbData }
    })
  )

  return reply.status(200).send(formatted)
}
