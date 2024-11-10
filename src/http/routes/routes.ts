import type { FastifyInstance } from 'fastify'

import { env } from '../../env'
import cors from '@fastify/cors'

import { reviewsRoute } from './reviews'
import { healthCheck } from './healthcheck'
import { loginRoute } from './login'
import { listsRoute } from './lists'
import { usersRoute } from './users'
import fastifyJwt from '@fastify/jwt'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { listItemRoute } from './list-item'
import { webhookRoutes } from './webhook'

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

  app.register(usersRoute)
  app.register(listsRoute)
  app.register(loginRoute)
  app.register(healthCheck)
  app.register(reviewsRoute)
  app.register(listItemRoute)
  app.register(webhookRoutes)

  return
}
