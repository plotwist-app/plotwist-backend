import type { FastifyReply, FastifyRequest } from 'fastify'
import {
  createReviewBodySchema,
  getReviewsQuerySchema,
  reviewParamsSchema,
  updateReviewBodySchema,
} from '../schemas/reviews'

import { createReview } from '@/domain/services/reviews/create-review'
import { DomainError } from '@/domain/errors/domain-error'
import { getReviewsService } from '@/domain/services/reviews/get-reviews'
import { deleteReviewService } from '@/domain/services/reviews/delete-review'
import { updateReviewService } from '@/domain/services/reviews/update-review'

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
  const { language, mediaType, tmdbId } = getReviewsQuerySchema.parse(
    request.query
  )

  const result = await getReviewsService({
    language,
    mediaType,
    tmdbId: Number(tmdbId),
  })

  return reply.status(200).send(result.reviews)
}

export async function deleteReviewController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = reviewParamsSchema.parse(request.params)
  const result = await deleteReviewService(id)

  if (result instanceof DomainError) {
    return reply.status(result.status).send({ message: result.message })
  }

  return reply.status(204).send()
}

export async function updateReviewController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = reviewParamsSchema.parse(request.params)
  const body = updateReviewBodySchema.parse(request.body)

  const result = await updateReviewService({ ...body, id })

  return reply.status(200).send(result.review)
}
