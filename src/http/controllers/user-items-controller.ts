import { DomainError } from '@/domain/errors/domain-error'
import { getTMDBDataService } from '@/domain/services/tmdb/get-tmdb-data'
import { upsertUserItemService } from '@/domain/services/user-items/upsert-user-item'
import { deleteUserItemService } from '@/domain/services/user-items/delete-user-item'
import { getUserItemService } from '@/domain/services/user-items/get-user-item'
import { getUserItemsService } from '@/domain/services/user-items/get-user-items'

import type { FastifyRedis } from '@fastify/redis'
import type { FastifyReply, FastifyRequest } from 'fastify'
import {
  upsertUserItemBodySchema,
  deleteUserItemParamsSchema,
  getUserItemQuerySchema,
  getUserItemsQuerySchema,
} from '../schemas/user-items'
import { createUserItemEpisodesService } from '@/domain/services/user-items/create-user-item-episodes'
import { deleteUserItemEpisodesService } from '@/domain/services/user-items/delete-user-item-episodes'

export async function upsertUserItemController(
  request: FastifyRequest,
  reply: FastifyReply,
  redis: FastifyRedis
) {
  const { tmdbId, mediaType, status } = upsertUserItemBodySchema.parse(
    request.body
  )

  const result = await upsertUserItemService({
    tmdbId,
    mediaType,
    status,
    userId: request.user.id,
  })

  if (mediaType === 'TV_SHOW' && status === 'WATCHED') {
    await createUserItemEpisodesService({
      redis,
      tmdbId,
      userId: request.user.id,
    })
  }

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
  const { language, status, userId } = getUserItemsQuerySchema.parse(
    request.query
  )

  const result = await getUserItemsService({
    status,
    userId,
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

  const result = await deleteUserItemService(id)

  if (result instanceof DomainError) {
    return reply.status(result.status).send({ message: result.message })
  }

  const { deletedUserItem } = result

  await deleteUserItemEpisodesService({
    tmdbId: deletedUserItem.tmdbId,
    userId: deletedUserItem.userId,
  })

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
