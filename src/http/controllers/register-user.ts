import { registerUser } from '@/app/functions/register-user'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { EmailOrUsernameAlreadyRegisteredError } from '@/app/errors/email-or-username-already-registered-error'
import { HashPasswordError } from '@/app/errors/hash-password-error'
import { z } from 'zod'
import { createInsertSchema } from 'drizzle-zod'
import { schema } from '@/db/schema'

export const registerUserBodySchema = z.object({
  username: z.string().min(1, 'Username is required.'),
  email: z.string().email('Email is invalid.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .default('password123'),
})

export const registerUserResponseSchema = {
  409: z
    .object({
      message: z.string(),
    })
    .describe('Email or username is already registered.'),
  500: z
    .object({
      message: z.string(),
    })
    .describe('Fail to hash password.'),
  200: z
    .object({
      user: createInsertSchema(schema.users).omit({ password: true }),
    })
    .describe('Fail to hash password.'),
}

export async function registerUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { username, email, password } = registerUserBodySchema.parse(
    request.body
  )

  const result = await registerUser({ username, email, password })

  if (result instanceof EmailOrUsernameAlreadyRegisteredError) {
    return reply.status(result.status).send({ message: result.message })
  }

  if (result instanceof HashPasswordError) {
    return reply.status(result.status).send({ message: result.message })
  }

  return reply.status(201).send({ user: result.user })
}
