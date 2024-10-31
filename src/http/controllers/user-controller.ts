import type { FastifyReply, FastifyRequest } from 'fastify'
import {
  createUserBodySchema,
  checkAvailableEmailQuerySchema,
  checkAvailableUsernameQuerySchema,
} from '../schemas/users'

import { checkAvailableUsername } from '@/app/domain/services/check-available-username'
import { checkAvailableEmail } from '@/app/domain/services/check-available-email'
import { createUser } from '@/app/domain/services/create-user'

export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { username, email, password } = createUserBodySchema.parse(request.body)

  const result = await createUser({ username, email, password })

  if (result instanceof Error) {
    return reply.status(result.status).send({ message: result.message })
  }

  return reply.status(201).send({ user: result.user })
}

export async function checkAvailableUsernameController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { username } = checkAvailableUsernameQuerySchema.parse(request.query)
  const result = await checkAvailableUsername({ username })

  if (result instanceof Error) {
    return reply.status(result.status).send({ message: result.message })
  }

  return reply.status(200).send({ available: result.available })
}

export async function checkAvailableEmailController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { email } = checkAvailableEmailQuerySchema.parse(request.query)
  const result = await checkAvailableEmail({ email })

  if (result instanceof Error) {
    return reply.status(result.status).send({ message: result.message })
  }

  return reply.status(200).send({ available: result.available })
}
