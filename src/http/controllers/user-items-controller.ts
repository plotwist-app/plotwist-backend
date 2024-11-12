import type { FastifyReply, FastifyRequest } from 'fastify'
import {
  createUserItemBodySchema,
  deleteUserItemParamsSchema,
  getUserItemsQuerySchema,
} from '../schemas/user-items'
import { createUserItemService } from '@/domain/services/user-items/create-user-item'
import { DomainError } from '@/domain/errors/domain-error'
import { getTMDBDataService } from '@/domain/services/tmdb/get-tmdb-data'
import type { FastifyRedis } from '@fastify/redis'
import { languageQuerySchema } from '../schemas/common'
import { getUserItemsService } from '@/domain/services/user-items/get-user-items'
import { deleteUserItemService } from '@/domain/services/user-items/delete-user-item'

export async function createUserItemController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { tmdbId, mediaType, status } = createUserItemBodySchema.parse(
    request.body
  )

  const result = await createUserItemService({
    tmdbId,
    mediaType,
    status,
    userId: request.user.id,
  })

  if (result instanceof DomainError) {
    return reply.status(result.status).send({ message: result.message })
  }

  return reply.status(201).send({ userItem: result.userItem })
}

export async function getUserItemsController(
  request: FastifyRequest,
  reply: FastifyReply,
  redis: FastifyRedis
) {
  const { language, status } = getUserItemsQuerySchema.parse(request.query)

  const result = await getUserItemsService({
    userId: request.user.id,
    status,
  })

  const formatted = await Promise.all(
    result.userItems.map(async item => {
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

export async function deleteUserItemController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = deleteUserItemParamsSchema.parse(request.params)

  await deleteUserItemService(id)

  return reply.send(204).send()
}
