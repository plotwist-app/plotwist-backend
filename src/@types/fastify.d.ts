import '@fastify/jwt'

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
    routerPath?: string
  }
}
