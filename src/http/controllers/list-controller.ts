import type { FastifyReply, FastifyRequest } from 'fastify'
import { registerListBodySchema } from '../schemas/register-list'
import { registerList } from '@/app/domain/services/register-list'

export async function registerListController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { title, description, visibility } = registerListBodySchema.parse(
    request.body
  )

  const result = await registerList({
    title,
    description,
    userId: request.user.id,
    visibility,
  })

  return reply.status(201).send({ list: result.list })
}
