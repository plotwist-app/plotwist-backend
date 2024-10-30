import { isLeft } from '@/core/either'
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { loginBodySchema } from '../schemas/login'
import { login } from '@/app/functions/login'

export async function loginController(
  request: FastifyRequest,
  reply: FastifyReply,
  app: FastifyInstance
) {
  const { email, password } = loginBodySchema.parse(request.body)
  const result = await login({ email, password })

  if (isLeft(result)) {
    const error = result.left

    switch (error.constructor.name) {
      case 'InvalidEmailError':
        return reply.status(401).send({ message: error.message })

      case 'InvalidPasswordError':
        return reply.status(401).send({ message: error.message })

      default:
        return reply.status(400).send()
    }
  }

  const token = app.jwt.sign({ id: result.right.user.id })
  return reply.status(200).send({ token })
}
