import { registerUser } from '@/app/domain/services/register-user'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { EmailOrUsernameAlreadyRegisteredError } from '@/app/domain/errors/email-or-username-already-registered-error'
import { HashPasswordError } from '@/app/domain/errors/hash-password-error'
import { registerUserBodySchema } from '../schemas/user'

export async function registerUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { username, email, password } = registerUserBodySchema.parse(
    request.body
  )

  const result = await registerUser({ username, email, password })

  if (result instanceof EmailOrUsernameAlreadyRegisteredError) {
    return reply.status(result.status).send({ message: result.message })
  }

  if (result instanceof HashPasswordError) {
    return reply.status(result.status).send({ message: result.message })
  }

  return reply.status(201).send({ user: result.user })
}
