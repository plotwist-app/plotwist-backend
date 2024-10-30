import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { loginBodySchema } from '../schemas/login'
import { login } from '@/app/domain/services/login'
import { InvalidEmailError } from '@/app/domain/errors/invalid-email-error'
import { InvalidPasswordError } from '@/app/domain/errors/invalid-password-error'

export async function loginController(
  request: FastifyRequest,
  reply: FastifyReply,
  app: FastifyInstance
) {
  const { email, password } = loginBodySchema.parse(request.body)
  const result = await login({ email, password })

  if (result instanceof InvalidEmailError) {
    return reply.status(result.status).send({ message: result.message })
  }

  if (result instanceof InvalidPasswordError) {
    return reply.status(result.status).send({ message: result.message })
  }

  if (result instanceof Error) {
    return reply.status(400).send()
  }

  const token = app.jwt.sign({ id: result.user.id })
  return reply.status(200).send({ token })
}
