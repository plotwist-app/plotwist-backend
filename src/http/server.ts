import fastifySwagger from '@fastify/swagger'
import fastify from 'fastify'

import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import { ZodError } from 'zod'
import { env } from '../env'
import { routes } from './routes'

export const app = fastify()

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
      return schema
    }
  },
})

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (error.statusCode === 429) {
    return reply
      .code(429)
      .send({ message: 'You hit the rate limit! Slow down please!' })
  }

  console.error({ error })
  return reply.status(500).send({ message: 'Internal server error.' })
})

routes(app)

// Server
app
  .listen({
    port: env.PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log(`HTTP server running at ${env.BASE_URL}`)
  })
