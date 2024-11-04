import type { FastifyReply, FastifyRequest } from 'fastify'
import {
  createUserBodySchema,
  isEmailAvailableQuerySchema,
  checkAvailableUsernameQuerySchema,
  getUserByUsernameParamsSchema,
} from '../schemas/users'

import { checkAvailableUsername } from '@/app/domain/services/is-username-available'
import { isEmailAvailable } from '@/app/domain/services/is-email-available'
import { createUser } from '@/app/domain/services/create-user'
import { getUserByUsername } from '@/app/domain/services/get-user-by-username'

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

export async function isEmailAvailableController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { email } = isEmailAvailableQuerySchema.parse(request.query)
  const result = await isEmailAvailable({ email })

  if (result instanceof Error) {
    return reply.status(result.status).send({ message: result.message })
  }

  return reply.status(200).send({ available: result.available })
}

export async function getUserByUsernameController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { username } = getUserByUsernameParamsSchema.parse(request.params)
  const result = await getUserByUsername({ username })

  if (result instanceof Error) {
    return reply.status(result.status).send({ message: result.message })
  }

  return reply.status(200).send({ user: result.user })
}
