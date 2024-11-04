import type { FastifyReply, FastifyRequest } from 'fastify'
import { createReviewRequestSchema } from '../schemas/reviews'

import { createReview } from '@/app/domain/services/reviews/create-review'
import { DomainError } from '@/app/domain/errors/domain-error'

export async function createReviewController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const body = createReviewRequestSchema.parse(request.body)

  const result = await createReview(body)

  if (result instanceof DomainError) {
    return reply.status(result.status).send({ message: result.message })
  }

  return reply.status(201).send({ review: result.review })
}
