import { getUserActivitiesService } from '@/domain/services/user-activities/get-user-activities'
import type { FastifyReply, FastifyRequest } from 'fastify'
import {
  getUserActivitiesParamsSchema,
  type GetUserActivitiesResponseType,
} from '../schemas/user-activities'
import { formatUserActivitiesService } from '@/domain/services/user-activities/format-user-activities'
import type { FastifyRedis } from '@fastify/redis'
import { languageQuerySchema } from '../schemas/common'

export async function getUserActivitiesController(
  request: FastifyRequest,
  reply: FastifyReply,
  redis: FastifyRedis
) {
  const { userId } = getUserActivitiesParamsSchema.parse(request.params)
  const { language } = languageQuerySchema.parse(request.query)

  const result = (await getUserActivitiesService({
    userId,
  })) as GetUserActivitiesResponseType

  const formattedResult = await formatUserActivitiesService({
    userActivities: result.userActivities,
    language,
    redis,
  })

  return reply.status(200).send(formattedResult)
}
