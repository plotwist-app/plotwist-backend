import type { FastifyReply, FastifyRequest } from 'fastify'
import { createListBodySchema, getListsQuerySchema } from '../schemas/lists'
import { createList } from '@/app/domain/services/create-list'
import { getLists } from '@/app/domain/services/get-lists'

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

  return reply.status(201).send({ list: result.list })
}

export async function getListsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { userId } = getListsQuerySchema.parse(request.query)

  const result = await getLists({
    userId,
    authenticatedUserId: request.user?.id,
  })

  return reply.status(200).send({ lists: result.lists })
}
