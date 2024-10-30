import { registerUser } from '@/app/functions/register-user'
import { isLeft } from '@/core/either'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { registerUserBodySchema } from '../schemas/register-user'

export async function registerUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { username, email, password } = registerUserBodySchema.parse(
    request.body
  )

  const result = await registerUser({ username, email, password })

  if (isLeft(result)) {
    const error = result.left

    switch (error.constructor.name) {
      case 'EmailOrUsernameAlreadyRegisteredError':
        return reply.status(409).send({ message: error.message })

      default:
        return reply.status(400).send()
    }
  }

  return reply.status(201).send({ user: result.right.user })
}
