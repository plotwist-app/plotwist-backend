import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { registerUserController } from '../controllers/register-user'
import {
  checkUsernameQuerySchema,
  registerUserBodySchema,
} from '../schemas/user'
import { checkUsernameController } from '../controllers/check-username'

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

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'GET',
      url: '/check-username',
      schema: {
        description: 'Check username',
        tags: ['User'],
        querystring: checkUsernameQuerySchema,
      },
      handler: (request, reply) => {
        checkUsernameController(request, reply)
      },
    })
  )
}
