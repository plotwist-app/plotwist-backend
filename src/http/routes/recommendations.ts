import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { generateRecommendationsController } from '../controllers/recommendations'

export async function recommendationsRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/recommendations',
    schema: {
      description: 'Generate recommendations',
      tags: ['Recommendations'],
    },
    handler: (request, reply) =>
      generateRecommendationsController(request, reply, app.redis),
  })
}
