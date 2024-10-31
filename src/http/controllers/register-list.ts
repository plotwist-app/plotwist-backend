import type { FastifyReply, FastifyRequest } from 'fastify'
import { registerList } from '@/app/functions/register-list'
import { z } from 'zod'

export const registerListBodySchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  description: z.string(),
})

export async function registerListController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { title, description } = registerListBodySchema.parse(request.body)

  const result = await registerList({ title, description })

  return reply.status(201).send({ list: result.list })
}
