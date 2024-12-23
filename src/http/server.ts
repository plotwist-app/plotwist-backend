import fastifySwagger from '@fastify/swagger'
import fastify from 'fastify'

import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { transformSwaggerSchema } from './transform-schema'

import { ZodError } from 'zod'
import { config } from '../env'
import { routes } from './routes'

export const app = fastify()

export function startServer() {
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
          url: config.app.BASE_URL,
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
        return transformSwaggerSchema(schema)
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

  app
    .listen({
      port: config.app.PORT,
      host: '0.0.0.0',
    })
    .then(() => {
      console.log('Process env:', process.env)
      console.log(`HTTP server running at ${config.app.BASE_URL}`)
    })
}
