import { registerUser } from '@/app/functions/register-user'
import { isLeft } from '@/core/either'
import type { FastifyInstance } from 'fastify'
import { z } from 'zod'

export async function registerUserRoute(app: FastifyInstance) {
  app.post('/users', async (request, reply) => {
    const registerUserBody = z.object({
      name: z.string(),
      email: z.string().email(),
    })

    const { name, email } = registerUserBody.parse(request.body)

    const result = await registerUser({ name, email })

    if (isLeft(result)) {
      const error = result.left

      switch (error.constructor.name) {
        case 'EmailAlreadyRegisteredError':
          return reply.status(409).send({ message: error.message })
        default:
          return reply.status(400).send()
      }
    }

    return reply.status(201).send({ user: result.right.user })
  })
}
