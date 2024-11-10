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
  getUserByIdParamsSchema,
  getMeResponseSchema,
  updateUserImageBodySchema,
  updateUserImageResponseSchema,
  updateUserBannerBodySchema,
} from '../schemas/users'
import {
  isEmailAvailableController,
  isUsernameAvailableController,
  createUserController,
  getUserByUsernameController,
  getUserByIdController,
  getMeController,
  updateUserImageController,
  updateUserBannerController,
} from '../controllers/user-controller'
import { verifyJwt } from '../middlewares/verify-jwt'

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
      url: '/user/image',
      onRequest: [verifyJwt],
      schema: {
        description: 'Update user image',
        tags: [usersTag],
        body: updateUserImageBodySchema,
        response: updateUserImageResponseSchema,
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      handler: updateUserImageController,
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'PATCH',
      url: '/user/banner',
      onRequest: [verifyJwt],
      schema: {
        description: 'Update user banner',
        tags: [usersTag],
        body: updateUserBannerBodySchema,
        response: updateUserImageResponseSchema,
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      handler: updateUserBannerController,
    })
  )
}
