import '@fastify/jwt'
import type { Span } from '@opentelemetry/api'
import 'fastify'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      id: string
    }
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    span?: Span
  }
}
