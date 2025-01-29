import { DomainError } from '@/domain/errors/domain-error'
import { getTMDBDataService } from '@/domain/services/tmdb/get-tmdb-data'
import { createUserActivity } from '@/domain/services/user-activities/create-user-activity'
import { deleteUserItemService } from '@/domain/services/user-items/delete-user-item'
import { getUserItemService } from '@/domain/services/user-items/get-user-item'
import { getUserItemsService } from '@/domain/services/user-items/get-user-items'
import { upsertUserItemService } from '@/domain/services/user-items/upsert-user-item'

import { createUserItemEpisodesService } from '@/domain/services/user-items/create-user-item-episodes'
import { deleteUserItemEpisodesService } from '@/domain/services/user-items/delete-user-item-episodes'
import { getAllUserItemsService } from '@/domain/services/user-items/get-all-user-items'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyReply, FastifyRequest } from 'fastify'
import {
  deleteUserItemParamsSchema,
  getUserItemQuerySchema,
  getUserItemsQuerySchema,
  listAllUserItemsQuerySchema,
  upsertUserItemBodySchema,
} from '../schemas/user-items'

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

  await createUserActivity({
    userId: request.user.id,
    activityType: 'CHANGE_STATUS',
    metadata: {
      tmdbId,
      mediaType,
      status,
      userItemId: result.userItem.id,
    },
  })

  return reply.status(201).send({ userItem: result.userItem })
}

export async function getUserItemsController(
  request: FastifyRequest,
  reply: FastifyReply,
  redis: FastifyRedis
) {
  const { language, status, userId, pageSize, cursor } =
    getUserItemsQuerySchema.parse(request.query)

  const { userItems, nextCursor } = await getUserItemsService({
    status,
    userId,
    pageSize: Number(pageSize),
    cursor,
  })

  const formattedUserItems = await Promise.all(
    userItems.map(async item => {
      const tmdbData = await getTMDBDataService(redis, {
        mediaType: item.mediaType,
        tmdbId: item.tmdbId,
        language: language || 'en-US',
      })

      return { ...item, ...tmdbData }
    })
  )

  return reply.status(200).send({ userItems: formattedUserItems, nextCursor })
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

  return reply.status(200).send(result)
}

export async function getAllUserItemsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { status, userId } = listAllUserItemsQuerySchema.parse(request.query)

  console.log(status, userId)

  const result = await getAllUserItemsService({ status, userId })

  return reply.status(200).send(result)
}
