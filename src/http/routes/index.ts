import cors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifyRedis from '@fastify/redis'
import fastifySwaggerUi from '@fastify/swagger-ui'

import type { FastifyInstance } from 'fastify'

import { env } from '../../env'

import { healthCheck } from './healthcheck'
import { listItemRoute } from './list-item'
import { listsRoute } from './lists'
import { loginRoute } from './login'
import { reviewsRoute } from './reviews'
import { userItemsRoutes } from './user-items'
import { usersRoute } from './users'
import { webhookRoutes } from './webhook'
import { reviewRepliesRoute } from './review-replies'
import { socialLinksRoute } from './social-links'
import { userEpisodesRoutes } from './user-episodes'

export function routes(app: FastifyInstance) {
  if (env.APP_ENV === 'dev') {
    app.register(fastifySwaggerUi, {
      routePrefix: '/api-docs',
    })
  }

  app.register(cors, {
    origin: env.CLIENT_URL ?? '*',
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
  app.register(reviewRepliesRoute)
  app.register(socialLinksRoute)
  app.register(userEpisodesRoutes)

  return
}
