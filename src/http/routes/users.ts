import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
  isEmailAvailableQuerySchema,
  checkAvailableUsernameQuerySchema,
  createUserBodySchema,
  createUserResponseSchema,
  checkAvailableUsernameResponseSchema,
  isEmailAvailableResponseSchema,
  getUserByUsernameParamsSchema,
  getUserByUsernameResponseSchema,
} from '../schemas/users'
import {
  isEmailAvailableController,
  checkAvailableUsernameController,
  createUserController,
  getUserByUsernameController,
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
        response: createUserResponseSchema,
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
        response: checkAvailableUsernameResponseSchema,
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
        querystring: isEmailAvailableQuerySchema,
        response: isEmailAvailableResponseSchema,
      },
      handler: isEmailAvailableController,
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'GET',
      url: '/users/:username',
      schema: {
        description: 'Get user by username',
        tags: [usersTag],
        params: getUserByUsernameParamsSchema,
        response: getUserByUsernameResponseSchema,
      },
      handler: getUserByUsernameController,
    })
  )
}
