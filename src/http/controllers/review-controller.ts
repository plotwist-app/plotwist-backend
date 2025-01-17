import type { FastifyRedis } from '@fastify/redis'
import type { FastifyReply, FastifyRequest } from 'fastify'
import {
  createReviewBodySchema,
  getReviewQuerySchema,
  getReviewsQuerySchema,
  getReviewSummaryQuerySchema,
  reviewParamsSchema,
  updateReviewBodySchema,
} from '../schemas/reviews'

import { DomainError } from '@/domain/errors/domain-error'
import { createReviewService } from '@/domain/services/reviews/create-review'
import { deleteReviewService } from '@/domain/services/reviews/delete-review'

import { getReviewsService } from '@/domain/services/reviews/get-reviews'
import { updateReviewService } from '@/domain/services/reviews/update-review'
import { getTMDBDataService } from '@/domain/services/tmdb/get-tmdb-data'
import { getReviewService } from '@/domain/services/reviews/get-review'
import { getReviewSummaryService } from '@/domain/services/reviews/get-review-summary'

export async function createReviewController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const body = createReviewBodySchema.parse(request.body)

  const result = await createReviewService({
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
  const { mediaType, tmdbId, userId, limit, interval } =
    getReviewsQuerySchema.parse(request.query)

  const result = await getReviewsService({
    mediaType,
    userId,
    tmdbId: Number(tmdbId),
    limit: Number(limit),
    authenticatedUserId: request.user?.id,
    interval,
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
  const { limit, language, orderBy, userId, interval } =
    getReviewsQuerySchema.parse(request.query)

  const result = await getReviewsService({
    limit: Number(limit),
    orderBy,
    userId,
    interval,
  })

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

export async function getReviewController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { mediaType, tmdbId } = getReviewQuerySchema.parse(request.query)

  const result = await getReviewService({
    mediaType,
    tmdbId: Number(tmdbId),
    userId: request.user.id,
  })

  return reply.status(200).send(result)
}

export async function getReviewSummaryController(
  request: FastifyRequest,
  reply: FastifyReply,
  redis: FastifyRedis
) {
  const { tmdbId, mediaType, language } = getReviewSummaryQuerySchema.parse(
    request.query
  )

  const result = await getReviewSummaryService({
    redis,
    values: { tmdbId, mediaType, language },
  })

  return reply.status(200).send(result)
}
