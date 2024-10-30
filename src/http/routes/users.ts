import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { registerUserController } from '../controllers/register-user'
import { registerUserBodySchema } from '../schemas/register-user'

export async function usersRoute(app: FastifyInstance) {
  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'POST',
      url: '/register-user',
      schema: {
        description: 'Register a user',
        tags: ['User'],
        body: registerUserBodySchema,
      },
      handler: registerUserController,
    })
  )
}
