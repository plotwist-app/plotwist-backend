import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { verifyJwt } from '../middlewares/verify-jwt'
import { registerListBodySchema } from '../schemas/register-list'
import { registerListController } from '../controllers/list-controller'

export async function listsRoute(app: FastifyInstance) {
  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'POST',
      url: '/register-list',
      onRequest: [verifyJwt],
      schema: {
        description: 'Register a list',
        tags: ['List'],
        body: registerListBodySchema,
        // response: registerListResponseSchema,
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
