import type { FastifyReply, FastifyRequest } from 'fastify'
import { checkUsername } from '@/app/functions/check-username'
import { UsernameAlreadyRegisteredError } from '@/app/errors/username-already-registered'
import { z } from 'zod'

export const checkUsernameQuerySchema = z.object({
  username: z.string().min(1, 'Username is required.'),
})

export const checkUsernameResponseSchema = {
  200: z.object({
    available: z.boolean(),
  }),
  409: z
    .object({
      message: z.string(),
    })
    .describe('Username is already registered.'),
}

export async function checkUsernameController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { username } = checkUsernameQuerySchema.parse(request.query)
  const result = await checkUsername({ username })

  if (result instanceof UsernameAlreadyRegisteredError) {
    return reply.status(result.status).send({ message: result.message })
  }

  return reply.status(200).send({ available: result.available })
}
