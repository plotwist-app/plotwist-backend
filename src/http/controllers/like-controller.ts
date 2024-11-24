import type { FastifyReply, FastifyRequest } from 'fastify'
import { createLikeBodySchema } from '../schemas/likes'
import { createLikeService } from '@/domain/services/likes/create-like'

export async function createLikeController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { entityId, entityType } = createLikeBodySchema.parse(request.body)
  const { like } = await createLikeService({
    entityId,
    entityType,
    userId: request.user.id,
  })

  return reply.status(201).send({ like })
}
