import { login } from '@/app/functions/login'
import { isLeft } from '@/core/either'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const loginRouteBodySchema = z.object({
  email: z.string().email('Invalid email format'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .default('password123'),
})

export async function loginRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/login',
    schema: {
      description: 'User login with email and password',
      tags: ['Auth'],
      body: loginRouteBodySchema,
    },
    handler: async (request, reply) => {
      const { email, password } = loginRouteBodySchema.parse(request.body)
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
    },
  })
}
