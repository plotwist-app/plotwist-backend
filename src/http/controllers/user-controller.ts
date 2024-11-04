import type { FastifyReply, FastifyRequest } from 'fastify'
import {
  createUserBodySchema,
  isEmailAvailableQuerySchema,
  checkAvailableUsernameQuerySchema,
  getUserByUsernameParamsSchema,
  getUserByIdParamsSchema,
} from '../schemas/users'

import { checkAvailableUsername } from '@/app/domain/services/users/is-username-available'
import { isEmailAvailable } from '@/app/domain/services/users/is-email-available'
import { createUser } from '@/app/domain/services/users/create-user'
import { getUserByUsername } from '@/app/domain/services/users/get-user-by-username'
import { DomainError } from '@/app/domain/errors/domain-error'
import { getUserById } from '@/app/domain/services/users/get-by-id'

export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { username, email, password } = createUserBodySchema.parse(request.body)

  const result = await createUser({ username, email, password })

  if (result instanceof DomainError) {
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

  if (result instanceof DomainError) {
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

  if (result instanceof DomainError) {
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

  if (result instanceof DomainError) {
    return reply.status(result.status).send({ message: result.message })
  }

  return reply.status(200).send({ user: result.user })
}

export async function getUserByIdController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = getUserByIdParamsSchema.parse(request.params)
  const result = await getUserById(id)

  if (result instanceof DomainError) {
    return reply.status(result.status).send({ message: result.message })
  }

  return reply.status(200).send({ user: result.user })
}
