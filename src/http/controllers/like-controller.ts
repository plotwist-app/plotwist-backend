import type { FastifyReply, FastifyRequest } from 'fastify'
import { createLikeBodySchema, deleteLikeParamsSchema } from '../schemas/likes'
import { createLikeService } from '@/domain/services/likes/create-like'
import { deleteLikeService } from '@/domain/services/likes/delete-like'

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

export async function deleteLikeController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = deleteLikeParamsSchema.parse(request.params)

  await deleteLikeService(id)

  return reply.status(204).send()
}
