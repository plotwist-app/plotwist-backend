import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
  checkEmailQuerySchema,
  checkUsernameQuerySchema,
  registerUserBodySchema,
} from '../schemas/user'
import {
  checkUsernameController,
  alreadyExistsEmailController,
  registerUserController,
} from '../controllers/user-controller'

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
      handler: checkUsernameController,
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'GET',
      url: '/check-email',
      schema: {
        description: 'Check email',
        tags: ['User'],
        querystring: checkEmailQuerySchema,
      },
      handler: alreadyExistsEmailController,
    })
  )
}
