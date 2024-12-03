import type { FastifyReply, FastifyRequest } from 'fastify'
import { getUserDefaultSchema } from '../schemas/user-stats'
import { getUserStatsService } from '@/domain/services/user-stats/get-user-stats'
import type { FastifyRedis } from '@fastify/redis'
import { getUserTotalHoursService } from '@/domain/services/user-stats/get-user-total-hours'
import { getUserReviewsCountService } from '@/domain/services/user-stats/get-user-reviews-count'
import { getUserMostWatchedSeriesService } from '@/domain/services/user-stats/get-user-most-watched-series'
import { languageQuerySchema } from '../schemas/common'
import { getUserWatchedGenresService } from '@/domain/services/user-stats/get-user-watched-genres'
import { getUserWatchedCastService } from '@/domain/services/user-stats/get-user-watched-cast'

export async function getUserStatsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = getUserDefaultSchema.parse(request.params)

  const result = await getUserStatsService(id)

  return reply.status(200).send(result.userStats)
}

export async function getUserTotalHoursController(
  request: FastifyRequest,
  reply: FastifyReply,
  redis: FastifyRedis
) {
  const { id } = getUserDefaultSchema.parse(request.params)
  const result = await getUserTotalHoursService(id, redis)

  return reply.status(200).send(result)
}

export async function getUserReviewsCountController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = getUserDefaultSchema.parse(request.params)
  const result = await getUserReviewsCountService(id)

  return reply.status(200).send(result)
}

export async function getUserMostWatchedSeriesController(
  request: FastifyRequest,
  reply: FastifyReply,
  redis: FastifyRedis
) {
  const { language } = languageQuerySchema.parse(request.query)
  const { id } = getUserDefaultSchema.parse(request.params)

  const result = await getUserMostWatchedSeriesService({
    userId: id,
    redis,
    language,
  })

  return reply.status(200).send(result)
}

export async function getUserWatchedGenresController(
  request: FastifyRequest,
  reply: FastifyReply,
  redis: FastifyRedis
) {
  const { language } = languageQuerySchema.parse(request.query)
  const { id } = getUserDefaultSchema.parse(request.params)

  const result = await getUserWatchedGenresService({
    userId: id,
    redis,
    language,
  })

  return reply.status(200).send(result)
}

export async function getUserWatchedCastController(
  request: FastifyRequest,
  reply: FastifyReply,
  redis: FastifyRedis
) {
  const { id } = getUserDefaultSchema.parse(request.params)
  const result = await getUserWatchedCastService({ userId: id, redis })

  return reply.status(200).send(result)
}
