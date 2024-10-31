import type { FastifyReply, FastifyRequest } from 'fastify'
import {
  registerUserBodySchema,
  checkEmailQuerySchema,
  checkUsernameQuerySchema,
} from '../schemas/user'

import { checkUsername } from '@/app/domain/services/check-username'
import { alreadyExistsEmail } from '@/app/domain/services/check-email'
import { registerUser } from '@/app/domain/services/register-user'

export async function alreadyExistsEmailController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { email } = checkEmailQuerySchema.parse(request.query)
  const result = await alreadyExistsEmail({ email })

  if (result instanceof Error) {
    return reply.status(result.status).send({ message: result.message })
  }

  return reply.status(200).send({ available: result.available })
}

export async function registerUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { username, email, password } = registerUserBodySchema.parse(
    request.body
  )

  const result = await registerUser({ username, email, password })

  if (result instanceof Error) {
    return reply.status(result.status).send({ message: result.message })
  }

  return reply.status(201).send({ user: result.user })
}

export async function checkUsernameController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { username } = checkUsernameQuerySchema.parse(request.query)
  const result = await checkUsername({ username })

  if (result instanceof Error) {
    return reply.status(result.status).send({ message: result.message })
  }

  return reply.status(200).send({ available: result.available })
}
