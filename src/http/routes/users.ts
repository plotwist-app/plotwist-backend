import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
  registerUserBodySchema,
  registerUserController,
  registerUserResponseSchema,
} from '../controllers/register-user'

import {
  checkUsernameController,
  checkUsernameQuerySchema,
  checkUsernameResponseSchema,
} from '../controllers/check-username'
import {
  checkEmailController,
  checkEmailQuerySchema,
  checkEmailResponseSchema,
} from '../controllers/check-email'

export async function usersRoute(app: FastifyInstance) {
  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'POST',
      url: '/register-user',
      schema: {
        description: 'Register a user',
        tags: ['User'],
        body: registerUserBodySchema,
        response: registerUserResponseSchema,
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
        response: checkUsernameResponseSchema,
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
        response: checkEmailResponseSchema,
      },
      handler: checkEmailController,
    })
  )
}
