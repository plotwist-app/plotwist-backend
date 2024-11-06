import cors from '@fastify/cors'
import fastify, { FastifyInstance } from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastifyJwt from '@fastify/jwt'

import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import { env } from '../env'

import { usersRoute } from './routes/users'
import { loginRoute } from './routes/login'
import { listsRoute } from './routes/lists'
import { reviewsRoute } from './routes/reviews'
import { healthCheck } from './routes/healthcheck'
import { listItemRoutes } from './routes/list-item'

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifySwagger, {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'Plotwist',
      version: '0.1.0',
    },
    servers: [
      {
        url: env.BASE_URL,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: schema => {
    try {
      return jsonSchemaTransform(schema)
    } catch (err) {
      console.error('Error transforming schema:', err)

      return schema
    }
  },
})

app.register(fastifySwaggerUi, {
  routePrefix: '/api-docs',
})

app.register(cors, {
  origin: '*',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

// Routes
app.register(usersRoute)
app.register(listsRoute)
app.register(listItemRoutes)
app.register(loginRoute)
app.register(healthCheck)
app.register(reviewsRoute)

// Server
app
  .listen({
    port: env.PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log(`HTTP server running at ${env.BASE_URL}`)
  })
