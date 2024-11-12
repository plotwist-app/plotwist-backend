import fastifyJwt from '@fastify/jwt'
import fastifySwaggerUi from '@fastify/swagger-ui'
import cors from '@fastify/cors'
import fastifyRedis from '@fastify/redis'

import type { FastifyInstance } from 'fastify'

import { env } from '../../env'

import { reviewsRoute } from './reviews'
import { healthCheck } from './healthcheck'
import { loginRoute } from './login'
import { listsRoute } from './lists'
import { usersRoute } from './users'
import { listItemRoute } from './list-item'
import { webhookRoutes } from './webhook'
import { userItemsRoutes } from './user-items'

export function routes(app: FastifyInstance) {
  app.register(fastifySwaggerUi, {
    routePrefix: '/api-docs',
  })

  app.register(cors, {
    origin: '*',
  })

  app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
  })

  app.register(fastifyRedis, {
    url: env.REDIS_URL,
  })

  app.register(usersRoute)
  app.register(listsRoute)
  app.register(loginRoute)
  app.register(healthCheck)
  app.register(reviewsRoute)
  app.register(listItemRoute)
  app.register(userItemsRoutes)
  app.register(webhookRoutes)

  return
}
