import type { FastifyReply, FastifyRequest } from 'fastify'
import { createWatchlistItemBodySchema } from '../schemas/watchlist'
import { createWatchlistItemService } from '@/domain/services/watchlist-item/create-watchlist-item'
import { DomainError } from '@/domain/errors/domain-error'

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

  return reply.status(201).send({ result })
}
