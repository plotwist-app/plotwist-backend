import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
  checkAvailableEmailQuerySchema,
  checkAvailableUsernameQuerySchema,
  createUserBodySchema,
} from '../schemas/users'
import {
  checkAvailableEmailController,
  checkAvailableUsernameController,
  createUserController,
} from '../controllers/user-controller'

export async function usersRoute(app: FastifyInstance) {
  const usersTag = 'Users'

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'POST',
      url: '/users/create',
      schema: {
        description: 'Create a user',
        tags: [usersTag],
        body: createUserBodySchema,
      },
      handler: createUserController,
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'GET',
      url: '/users/available-username',
      schema: {
        description: 'Check if this username is available',
        tags: [usersTag],
        querystring: checkAvailableUsernameQuerySchema,
      },
      handler: checkAvailableUsernameController,
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'GET',
      url: '/users/check-email',
      schema: {
        description: 'Check if this email is available',
        tags: [usersTag],
        querystring: checkAvailableEmailQuerySchema,
      },
      handler: checkAvailableEmailController,
    })
  )
}
