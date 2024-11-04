import type { FastifyReply, FastifyRequest } from 'fastify'
import { createListBodySchema, getListsQuerySchema } from '../schemas/lists'
import { createList } from '@/app/domain/services/lists/create-list'
import { getLists } from '@/app/domain/services/lists/get-lists'
import { DomainError } from '@/app/domain/errors/domain-error'

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
