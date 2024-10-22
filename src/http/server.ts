import cors from '@fastify/cors'
import fastify from 'fastify'

import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import { env } from '../env'
import { registerReviewRoute } from './routes/register-review'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

const app = fastify()
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifySwagger, {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'Event booster',
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

// Routes
app.register(registerReviewRoute)

// Server
app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP server running!')
  })
