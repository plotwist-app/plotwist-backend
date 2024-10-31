import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { login } from '@/app/functions/login'
import { InvalidEmailError } from '@/app/errors/invalid-email-error'
import { InvalidPasswordError } from '@/app/errors/invalid-password-error'
import { z } from 'zod'

export const loginBodySchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .default('password123'),
})

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
