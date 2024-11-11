import type { FastifyReply, FastifyRequest } from 'fastify'
import {
  createListItemBodySchema,
  deleteListItemParamSchema,
  getListItemsParamsSchema,
} from '../schemas/list-item'
import { createListItemService } from '@/domain/services/list-item/create-list-item'
import { getListItemsService } from '@/domain/services/list-item/get-list-items'
import { DomainError } from '@/domain/errors/domain-error'
import { deleteListItemService } from '@/domain/services/list-item/delete-list-item'
import { getTMDBDataService } from '@/domain/services/tmdb/get-tmdb-data'
import type { FastifyRedis } from '@fastify/redis'
import { languageQuerySchema } from '../schemas/common'

export async function createListItemController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const body = createListItemBodySchema.parse(request.body)
  const result = await createListItemService({ ...body })

  if (result instanceof DomainError) {
    return reply.status(result.status).send({ message: result.message })
  }

  return reply.status(201).send({ listItem: result.listItem })
}

export async function getListItemsController(
  request: FastifyRequest,
  reply: FastifyReply,
  redis: FastifyRedis
) {
  const { listId } = getListItemsParamsSchema.parse(request.params)
  const { language } = languageQuerySchema.parse(request.query)

  const result = await getListItemsService({ listId })

  if (result instanceof DomainError) {
    return reply.status(result.status).send({ message: result.message })
  }

  const listItems = await Promise.all(
    result.listItems.map(async listItem => {
      const tmdbData = getTMDBDataService(redis, {
        language,
        mediaType: listItem.mediaType,
        tmdbId: listItem.tmdbId,
      })

      return { ...listItem, ...tmdbData }
    })
  )

  return reply.status(201).send({ listItems })
}

export async function deleteListItemController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = deleteListItemParamSchema.parse(request.params)

  const result = await deleteListItemService({
    id,
    authenticatedUserId: request.user.id,
  })

  if (result instanceof DomainError) {
    return reply.status(result.status).send({ message: result.message })
  }

  return reply.status(204).send()
}
