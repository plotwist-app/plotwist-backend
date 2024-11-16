import type { FastifyRedis } from '@fastify/redis'
import type { FastifyReply, FastifyRequest } from 'fastify'
import {
  createReviewBodySchema,
  getDetailedReviewsQuerySchema,
  getReviewsQuerySchema,
  reviewParamsSchema,
  updateReviewBodySchema,
} from '../schemas/reviews'

import { DomainError } from '@/domain/errors/domain-error'
import { createReview } from '@/domain/services/reviews/create-review'
import { deleteReviewService } from '@/domain/services/reviews/delete-review'
import { getDetailedReviewsService } from '@/domain/services/reviews/get-detailed-reviews'
import { getReviewsService } from '@/domain/services/reviews/get-reviews'
import { updateReviewService } from '@/domain/services/reviews/update-review'
import { getTMDBDataService } from '@/domain/services/tmdb/get-tmdb-data'

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

export async function getDetailedReviewsController(
  request: FastifyRequest,
  reply: FastifyReply,
  redis: FastifyRedis
) {
  const { userId, language, limit } = getDetailedReviewsQuerySchema.parse(
    request.query
  )

  const result = await getDetailedReviewsService({ userId, language, limit })

  const mergedReviews = await Promise.all(
    result.reviews.map(async review => {
      const tmdbData = await getTMDBDataService(redis, {
        language: language || 'en-US',
        mediaType: review.mediaType,
        tmdbId: review.tmdbId,
      })

      return { ...review, ...tmdbData }
    })
  )

  return reply.status(200).send({ reviews: mergedReviews })
}
