import type { FastifyReply, FastifyRequest } from 'fastify'
import { createListBodySchema } from '../schemas/lists'
import { createList } from '@/app/domain/services/create-list'

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
