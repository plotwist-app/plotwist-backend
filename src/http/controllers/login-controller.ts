import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { loginBodySchema } from '../schemas/login'
import { loginService } from '@/domain/services/login'

export async function loginController(
  request: FastifyRequest,
  reply: FastifyReply,
  app: FastifyInstance
) {
  const { email, password } = loginBodySchema.parse(request.body)

  const result = await loginService({
    email,
    password,
    url: `${request.protocol}://${request.hostname}`,
  })

  if (result instanceof Error) {
    return reply.status(result.status).send({ message: result.message })
  }

  if (result.status) {
    return reply.status(201).send({ status: result.status })
  }

  if (result.user) {
    const token = app.jwt.sign({ id: result.user.id })
    return reply.status(200).send({ token })
  }
}
