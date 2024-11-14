import { DomainError } from '@/domain/errors/domain-error'
import { getTMDBDataService } from '@/domain/services/tmdb/get-tmdb-data'
import { createUserItemService } from '@/domain/services/user-items/create-user-item'
import { deleteUserItemService } from '@/domain/services/user-items/delete-user-item'
import { getUserItemService } from '@/domain/services/user-items/get-user-item'
import { getUserItemsService } from '@/domain/services/user-items/get-user-items'
import { updateUserItemStatusService } from '@/domain/services/user-items/update-user-item'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyReply, FastifyRequest } from 'fastify'
import {
  createUserItemBodySchema,
  deleteUserItemParamsSchema,
  getUserItemQuerySchema,
  getUserItemsQuerySchema,
  updateUserItemStatusBodySchema,
  updateUserItemStatusParamsSchema,
} from '../schemas/user-items'

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
        language: language || 'en-US',
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

export async function getUserItemController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { mediaType, tmdbId } = getUserItemQuerySchema.parse(request.query)

  const result = await getUserItemService({
    mediaType,
    tmdbId: Number(tmdbId),
    userId: request.user.id,
  })

  return reply.status(200).send({ userItem: result.userItem })
}

export async function updateUserItemStatusController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = updateUserItemStatusParamsSchema.parse(request.params)
  const { status } = updateUserItemStatusBodySchema.parse(request.body)

  const result = await updateUserItemStatusService({
    id,
    status,
  })

  return reply.status(200).send({ userItem: result.userItem })
}
