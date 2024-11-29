import type { FastifyReply, FastifyRequest } from 'fastify'
import {
  getUserStatsParamsSchema,
  getUserTotalHoursParamsSchema,
} from '../schemas/user-stats'
import { getUserStatsService } from '@/domain/services/user-stats/get-user-stats'
import type { FastifyRedis } from '@fastify/redis'
import { getUserTotalHoursService } from '@/domain/services/user-stats/get-user-total-hours'

export async function getUserStatsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = getUserStatsParamsSchema.parse(request.params)

  const result = await getUserStatsService(id)

  return reply.status(200).send(result.userStats)
}

export async function getUserTotalHoursController(
  request: FastifyRequest,
  reply: FastifyReply,
  redis: FastifyRedis
) {
  const { id } = getUserTotalHoursParamsSchema.parse(request.params)
  const result = await getUserTotalHoursService(id, redis)

  return reply.status(200).send(result)
}
