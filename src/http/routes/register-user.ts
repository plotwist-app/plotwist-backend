import { registerUser } from '@/app/functions/register-user'
import { isLeft } from '@/core/either'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

const bodySchema = z.object({
  username: z.string().min(1, 'Username is required.'),
  email: z.string().email('E-mail is invalid.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .default('password123'),
})

export async function registerUserRoute(app: FastifyInstance) {
  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'POST',
      url: '/register-user',
      schema: {
        description: 'Register a user',
        tags: ['User'],
        body: bodySchema,
      },
      handler: async (request, reply) => {
        const { username, email, password } = bodySchema.parse(request.body)

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
      },
    })
  )
}
