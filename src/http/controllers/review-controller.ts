import type { FastifyReply, FastifyRequest } from 'fastify'
import { createReviewReplyRequestSchema, createReviewRequestSchema } from '../schemas/reviews'

import { createReview } from '@/domain/services/reviews/create-review'
import { DomainError } from '@/domain/errors/domain-error'
import { createReviewReply } from '@/domain/services/reviews/create-review-reply'

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

export async function createReviewReplyController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const body = createReviewReplyRequestSchema.parse(request.body)

  const result = await createReviewReply(body)

  if (result instanceof DomainError) {
    return reply.status(result.status).send({ message: result.message })
  }

  return reply.status(201).send({ reviewReply: result.reviewReply })
}
