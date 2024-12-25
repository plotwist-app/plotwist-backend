import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
  deleteUserActivityController,
  getUserActivitiesController,
} from '../controllers/user-activities-controller'
import {
  deleteUserActivityParamsSchema,
  getUserActivitiesParamsSchema,
  getUserActivitiesQuerySchema,
  getUserActivitiesResponseSchema,
} from '../schemas/user-activities'

const TAGS = ['User activities']

export async function userActivitiesRoutes(app: FastifyInstance) {
  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'GET',
      url: '/user/:userId/activities',
      schema: {
        description: 'Get user activities',
        operationId: 'getUserActivities',
        tags: TAGS,
        querystring: getUserActivitiesQuerySchema,
        params: getUserActivitiesParamsSchema,
        response: getUserActivitiesResponseSchema,
      },
      handler: (request, reply) =>
        getUserActivitiesController(request, reply, app.redis),
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'DELETE',
      url: '/user/activities/:activityId',
      schema: {
        description: 'Delete user activity',
        operationId: 'deleteUserActivity',
        tags: TAGS,
        params: deleteUserActivityParamsSchema,
      },
      handler: deleteUserActivityController,
    })
  )
}
