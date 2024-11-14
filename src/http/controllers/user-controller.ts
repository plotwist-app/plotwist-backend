import type { FastifyReply, FastifyRequest } from 'fastify'
import {
  createUserBodySchema,
  isEmailAvailableQuerySchema,
  checkAvailableUsernameQuerySchema,
  getUserByUsernameParamsSchema,
  getUserByIdParamsSchema,
  updateUserPasswordBodySchema,
  updateUserBodySchema,
} from '../schemas/users'

import { checkAvailableUsername } from '@/domain/services/users/is-username-available'
import { isEmailAvailable } from '@/domain/services/users/is-email-available'
import { createUser } from '@/domain/services/users/create-user'
import { getUserByUsername } from '@/domain/services/users/get-user-by-username'
import { DomainError } from '@/domain/errors/domain-error'
import { getUserById } from '@/domain/services/users/get-by-id'
import { updateUserService } from '@/domain/services/users/update-user'
import { updatePasswordService } from '@/domain/services/users/update-user-password'

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

export async function isUsernameAvailableController(
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

export async function getMeController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const result = await getUserById(request.user.id)

  if (result instanceof DomainError) {
    return reply.status(result.status).send({ message: result.message })
  }

  return reply.status(200).send({ user: result.user })
}

export async function updateUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { bannerPath, imagePath, username } = updateUserBodySchema.parse(
    request.body
  )

  const result = await updateUserService({
    userId: request.user.id,
    bannerPath,
    imagePath,
    username,
  })

  if (result instanceof DomainError) {
    return reply.status(result.status).send({ message: result.message })
  }

  return reply.status(200).send({ user: result.user })
}

export async function updateUserPasswordController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { password, token } = updateUserPasswordBodySchema.parse(request.body)
  const { status } = await updatePasswordService({ password, token })

  return reply.status(200).send({ status: status })
}
