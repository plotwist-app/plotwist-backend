import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
  createUserController,
  getMeController,
  getUserByIdController,
  getUserByUsernameController,
  getUserPreferencesController,
  isEmailAvailableController,
  isUsernameAvailableController,
  updateUserController,
  updateUserPasswordController,
  updateUserPreferencesController,
} from '../controllers/user-controller'
import { verifyJwt } from '../middlewares/verify-jwt'
import {
  checkAvailableUsernameQuerySchema,
  checkAvailableUsernameResponseSchema,
  createUserBodySchema,
  createUserResponseSchema,
  getMeResponseSchema,
  getUserByIdParamsSchema,
  getUserByUsernameParamsSchema,
  getUserByUsernameResponseSchema,
  getUserPreferencesResponseSchema,
  isEmailAvailableQuerySchema,
  isEmailAvailableResponseSchema,
  updateUserBodySchema,
  updateUserPasswordBodySchema,
  updateUserPasswordResponseSchema,
  updateUserPreferencesBodySchema,
  updateUserPreferencesResponseSchema,
  updateUserResponseSchema,
} from '../schemas/users'

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
      handler: isUsernameAvailableController,
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'GET',
      url: '/users/available-email',
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

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'GET',
      url: '/user/by/:id',
      schema: {
        description: 'Get user by',
        tags: [usersTag],
        params: getUserByIdParamsSchema,
        response: createUserResponseSchema,
      },
      handler: getUserByIdController,
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'GET',
      url: '/me',
      onRequest: [verifyJwt],
      schema: {
        description: 'Get me',
        tags: [usersTag],
        response: getMeResponseSchema,
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      handler: getMeController,
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'PATCH',
      url: '/user',
      onRequest: [verifyJwt],
      schema: {
        description: 'Update user',
        tags: [usersTag],
        body: updateUserBodySchema,
        response: updateUserResponseSchema,
        security: [{ bearerAuth: [] }],
      },
      handler: updateUserController,
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'PATCH',
      url: '/user/password',
      schema: {
        description: 'Update user password',
        tags: [usersTag],
        body: updateUserPasswordBodySchema,
        response: updateUserPasswordResponseSchema,
      },
      handler: updateUserPasswordController,
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'PATCH',
      url: '/user/preferences',
      onRequest: [verifyJwt],
      schema: {
        description: 'Update user preferences',
        tags: [usersTag],
        body: updateUserPreferencesBodySchema,
        response: updateUserPreferencesResponseSchema,
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      handler: updateUserPreferencesController,
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'GET',
      url: '/user/preferences',
      onRequest: [verifyJwt],
      schema: {
        description: 'Get user preferences',
        tags: [usersTag],
        response: getUserPreferencesResponseSchema,
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      handler: getUserPreferencesController,
    })
  )
}
