import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { createReviewController } from '../controllers/review-controller'
import {
  createReviewRequestSchema,
  createReviewResponseSchema,
} from '../schemas/reviews'

export async function reviewsRoute(app: FastifyInstance) {
  const reviewsTag = 'Reviews'

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'POST',
      url: '/reviews/create',
      schema: {
        description: 'Create a review',
        tags: [reviewsTag],
        body: createReviewRequestSchema,
        response: createReviewResponseSchema,
      },
      handler: createReviewController,
    })
  )
}
