import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { loginBodySchema } from '../schemas/login'
import { loginController } from '../controllers/login'

export async function loginRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/login',
    schema: {
      description: 'User login with email and password',
      tags: ['Auth'],
      body: loginBodySchema,
    },
    handler: (request, reply) => loginController(request, reply, app),
  })
}
