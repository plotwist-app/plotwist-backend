import cors from '@fastify/cors'
import fastify from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import { env } from '../env'

import { registerUserRoute } from './routes/register-user'

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
app.register(registerUserRoute)

// Server
app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log(`HTTP server running at ${env.BASE_URL}`)
  })
