import type { FastifyReply, FastifyRequest } from 'fastify'
import {
  createReviewBodySchema,
  getReviewsQuerySchema,
} from '../schemas/reviews'

import { createReview } from '@/domain/services/reviews/create-review'
import { DomainError } from '@/domain/errors/domain-error'
import { getReviewsService } from '@/domain/services/reviews/get-reviews'

export async function createReviewController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const body = createReviewBodySchema.parse(request.body)

  const result = await createReview({
    ...body,
    userId: request.user.id,
  })

  if (result instanceof DomainError) {
    return reply.status(result.status).send({ message: result.message })
  }

  return reply.status(201).send({ review: result.review })
}

export async function getReviewsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const query = getReviewsQuerySchema.parse(request.query)
  const result = await getReviewsService(query)

  return reply.status(200).send(result.reviews)
}
