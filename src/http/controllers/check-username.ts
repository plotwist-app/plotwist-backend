import type { FastifyReply, FastifyRequest } from 'fastify'
import { checkUsernameQuerySchema } from '../schemas/user'
import { checkUsername } from '@/app/functions/check-username'
import { UsernameAlreadyRegisteredError } from '@/app/errors/username-already-registered'

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
