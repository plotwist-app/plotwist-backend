import { registerUser } from '@/app/functions/register-user'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { registerUserBodySchema } from '../schemas/register-user'
import { EmailOrUsernameAlreadyRegisteredError } from '@/app/errors/email-or-username-already-registered-error'
import { HashPasswordError } from '@/app/errors/hash-password-error'

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
