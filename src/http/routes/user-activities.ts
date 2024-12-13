import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { getUserActivitiesController } from '../controllers/user-activities-controller'
import {
  getUserActivitiesParamsSchema,
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
        params: getUserActivitiesParamsSchema,
        response: getUserActivitiesResponseSchema,
      },
      handler: getUserActivitiesController,
    })
  )
}
