import fastify from 'fastify'
import fastifySwagger from '@fastify/swagger'

import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import { env } from '../env'
import { routes } from './routes/routes'

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
      console.error('Error transforming schema:', err)

      return schema
    }
  },
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
