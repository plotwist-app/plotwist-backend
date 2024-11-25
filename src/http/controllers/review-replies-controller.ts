import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { DomainError } from '@/domain/errors/domain-error'
import { createReviewReply } from '@/domain/services/review-replies/create-review-reply'
import { deleteReviewReply } from '@/domain/services/review-replies/delete-review-reply'
import { fetchReviewReplies } from '@/domain/services/review-replies/fetch-review-replies'
import { updateReviewReply } from '@/domain/services/review-replies/update-review-reply'
import {
  createReviewReplyBodySchema,
  deleteReviewReplyParamsSchema,
  fetchReviewRepliesQuerySchema,
  reviewReplyParamsSchema,
  updateReviewReplyBodySchema,
  updateReviewReplyParamsSchema,
} from '../schemas/review-replies'

export async function createReviewReplyController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const body = createReviewReplyBodySchema.parse(request.body)

  const result = await createReviewReply({
    ...body,
    userId: request.user.id,
  })

  if (result instanceof DomainError) {
    return reply.status(result.status).send({ message: result.message })
  }

  return reply.status(201).send({ reviewReply: result.reviewReply })
}

export async function updateReviewReplyController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = reviewReplyParamsSchema.parse(request.params)
  const { reply: updateReply } = updateReviewReplyBodySchema.parse(request.body)
  const { reviewId } = updateReviewReplyParamsSchema.parse(request.query)

  const result = await updateReviewReply({
    id,
    reply: updateReply,
    userId: request.user.id,
    reviewId,
  })

  if (result instanceof DomainError) {
    return reply.status(result.status).send({ message: result.message })
  }

  return reply.status(200).send({ reviewReply: result.reviewReply })
}

export async function deleteReviewReplyController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = deleteReviewReplyParamsSchema.parse(request.params)
  const result = await deleteReviewReply(id)

  if (result instanceof DomainError) {
    return reply.status(result.status).send({ message: result.message })
  }

  return reply.status(204).send()
}

export async function fetchReviewRepliesController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { reviewId, page } = fetchReviewRepliesQuerySchema.parse(request.query)

  const result = await fetchReviewReplies({ reviewId, page })

  return reply.status(200).send(result)
}
