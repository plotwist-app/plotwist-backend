import type { FastifyReply, FastifyRequest } from 'fastify'
import { getUserStatsParamsSchema } from '../schemas/user-stats'
import { getUserStatsService } from '@/domain/services/user-stats/get-user-stats'

export async function getUserStatsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = getUserStatsParamsSchema.parse(request.params)

  const result = await getUserStatsService(id)

  return reply.status(200).send(result.userStats)
}
