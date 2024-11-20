import type { FastifyReply, FastifyRequest } from 'fastify'
import {
  createUserEpisodeBodySchema,
  deleteUserEpisodeParamsSchema,
  getUserEpisodesQuerySchema,
} from '../schemas/user-episodes'
import { createUserEpisodeService } from '@/domain/services/user-episodes/create-user-episode'
import { DomainError } from '@/domain/errors/domain-error'
import { getUserEpisodesService } from '@/domain/services/user-episodes/get-user-episodes'
import { deleteUserEpisodeService } from '@/domain/services/user-episodes/delete-user-episode'

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

export async function getUserEpisodesController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { tmdbId } = getUserEpisodesQuerySchema.parse(request.query)

  const result = await getUserEpisodesService({
    tmdbId: Number(tmdbId),
    userId: request.user.id,
  })

  return reply.status(200).send({ userEpisodes: result.userEpisodes })
}

export async function deleteUserEpisodeController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = deleteUserEpisodeParamsSchema.parse(request.params)
  await deleteUserEpisodeService(id)

  return reply.status(204).send()
}
