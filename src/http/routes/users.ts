import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
  checkEmailQuerySchema,
  checkUsernameQuerySchema,
  createUserBodySchema,
} from '../schemas/users'
import {
  checkUsernameController,
  alreadyExistsEmailController,
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
      url: '/users/check-username',
      schema: {
        description: 'Check username',
        tags: [usersTag],
        querystring: checkUsernameQuerySchema,
      },
      handler: checkUsernameController,
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'GET',
      url: '/users/check-email',
      schema: {
        description: 'Check email',
        tags: [usersTag],
        querystring: checkEmailQuerySchema,
      },
      handler: alreadyExistsEmailController,
    })
  )
}
