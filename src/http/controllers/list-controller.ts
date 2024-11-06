import type { FastifyReply, FastifyRequest } from 'fastify'
import {
  createListBodySchema,
  deleteListParamsSchema,
  getListParamsSchema,
  getListsQuerySchema,
  updateListBannerParamsSchema,
  updateListBodySchema,
  updateListParamsSchema,
} from '../schemas/lists'
import { createList } from '@/domain/services/lists/create-list'
import { getLists } from '@/domain/services/lists/get-lists'
import { DomainError } from '@/domain/errors/domain-error'
import { deleteListService } from '@/domain/services/lists/delete-list'
import { updateListService } from '@/domain/services/lists/update-list'
import { getListService } from '@/domain/services/lists/get-list'
import { updateListBannerService } from '@/domain/services/lists/update-list-banner'

export async function createListController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { title, description, visibility } = createListBodySchema.parse(
    request.body
  )

  const result = await createList({
    title,
    description,
    userId: request.user.id,
    visibility,
  })

  if (result instanceof Error) {
    return reply.status(result.status).send({ message: result.message })
  }

  return reply.status(201).send({ list: result.list })
}

export async function getListsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { userId, limit } = getListsQuerySchema.parse(request.query)

  const result = await getLists({
    userId,
    authenticatedUserId: request.user?.id,
    limit: Number(limit),
  })

  if (result instanceof DomainError) {
    return reply.status(result.status).send({ message: result.message })
  }

  return reply.status(200).send({ lists: result.lists })
}

export async function deleteListController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = deleteListParamsSchema.parse(request.params)
  const result = await deleteListService({ id, userId: request.user.id })

  if (result instanceof DomainError) {
    return reply.status(result.status).send({ message: result.message })
  }

  return reply.status(204).send()
}

export async function updateListController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = updateListParamsSchema.parse(request.params)
  const values = updateListBodySchema.parse(request.body)

  const result = await updateListService({
    id: id,
    userId: request.user.id,
    values: values,
  })

  if (result instanceof DomainError) {
    return reply.status(result.status).send({ message: result.message })
  }

  return reply.status(200).send({ list: result.list })
}

export async function getListController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = getListParamsSchema.parse(request.params)
  const result = await getListService({
    id: id,
  })

  if (result instanceof DomainError) {
    return reply.status(result.status).send({ message: result.message })
  }

  return reply.status(200).send({ list: result.list })
}

export async function updateListBannerController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { listId, bannerPath } = updateListBannerParamsSchema.parse(
    request.params
  )

  const result = await updateListBannerService({
    listId,
    bannerPath,
    userId: request.user.id,
  })

  if (result instanceof DomainError) {
    return reply.status(result.status).send({ message: result.message })
  }

  return reply.status(200).send({ list: result.list })
}
