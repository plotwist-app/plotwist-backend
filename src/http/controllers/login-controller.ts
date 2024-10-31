import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { loginBodySchema } from '../schemas/login'
import { login } from '@/app/domain/services/login'

export async function loginController(
  request: FastifyRequest,
  reply: FastifyReply,
  app: FastifyInstance
) {
  const { email, password } = loginBodySchema.parse(request.body)
  const result = await login({ email, password })

  if (result instanceof Error) {
    return reply.status(result.status).send({ message: result.message })
  }

  const token = app.jwt.sign({ id: result.user.id })
  return reply.status(200).send({ token })
}
