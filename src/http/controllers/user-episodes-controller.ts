import type { FastifyReply, FastifyRequest } from 'fastify'
import { createUserEpisodeBodySchema } from '../schemas/user-episodes'
import { createUserEpisodeService } from '@/domain/services/user-episodes/create-user-episode'
import { DomainError } from '@/domain/errors/domain-error'

export async function createUserEpisodeController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const body = createUserEpisodeBodySchema.parse(request.body)

  const result = await createUserEpisodeService({
    ...body,
    userId: request.user.id,
  })

  if (result instanceof DomainError) {
    return reply.status(result.status).send({ message: result.message })
  }

  return reply.status(201).send({ userEpisode: result.userEpisode })
}
