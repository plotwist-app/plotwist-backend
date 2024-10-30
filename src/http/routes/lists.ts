import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { verifyJwt } from '../hooks/verify-jwt'
import { registerListBodySchema } from '../schemas/register-list'
import { registerListController } from '../controllers/register-list'

export async function registerListRoute(app: FastifyInstance) {
  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'POST',
      url: '/register-list',
      onRequest: [verifyJwt],
      schema: {
        description: 'Register a list',
        tags: ['List'],
        body: registerListBodySchema,
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      handler: registerListController,
    })
  )
}
