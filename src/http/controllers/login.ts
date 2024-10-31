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

export const loginResponseSchema = {
  200: z.object({
    token: z.string(),
  }),
  400: z
    .object({
      message: z.string(),
    })
    .describe('Invalid email or password.'),
}

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

  const token = app.jwt.sign({ id: result.user.id })
  return reply.status(200).send({ token })
}
