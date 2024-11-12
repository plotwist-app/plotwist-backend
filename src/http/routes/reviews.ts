import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import {
  createReviewController,
  getReviewsController,
} from '../controllers/review-controller'
import {
  createReviewBodySchema,
  createReviewResponseSchema,
  getReviewsQuerySchema,
  getReviewsResponseSchema,
} from '../schemas/reviews'
import { verifyJwt } from '../middlewares/verify-jwt'

export async function reviewsRoute(app: FastifyInstance) {
  const reviewsTag = 'Reviews'

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'POST',
      url: '/review',
      onRequest: [verifyJwt],
      schema: {
        description: 'Create a review',
        tags: [reviewsTag],
        body: createReviewBodySchema,
        response: createReviewResponseSchema,
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      handler: createReviewController,
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'GET',
      url: '/reviews',
      schema: {
        description: 'Get reviews',
        tags: [reviewsTag],
        querystring: getReviewsQuerySchema,
        response: getReviewsResponseSchema,
      },
      handler: getReviewsController,
    })
  )
}
