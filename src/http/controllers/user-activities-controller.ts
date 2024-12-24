import { getUserActivitiesService } from '@/domain/services/user-activities/get-user-activities'
import type { FastifyReply, FastifyRequest } from 'fastify'
import {
  deleteUserActivityParamsSchema,
  getUserActivitiesParamsSchema,
  getUserActivitiesQuerySchema,
  type GetUserActivitiesResponseType,
} from '../schemas/user-activities'
import { formatUserActivitiesService } from '@/domain/services/user-activities/format-user-activities'
import type { FastifyRedis } from '@fastify/redis'
import { deleteUserActivityService } from '@/domain/services/user-activities/delete-user-activity'

export async function getUserActivitiesController(
  request: FastifyRequest,
  reply: FastifyReply,
  redis: FastifyRedis
) {
  const { userId } = getUserActivitiesParamsSchema.parse(request.params)
  const { language, pageSize, cursor } = getUserActivitiesQuerySchema.parse(
    request.query
  )

  const result = (await getUserActivitiesService({
    userId,
    cursor,
    pageSize: Number(pageSize),
  })) as GetUserActivitiesResponseType

  const { userActivities } = await formatUserActivitiesService({
    userActivities: result.userActivities,
    language,
    redis,
  })

  return reply.status(200).send({ ...result, userActivities })
}

export async function deleteUserActivityController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { activityId } = deleteUserActivityParamsSchema.parse(request.params)
  await deleteUserActivityService(activityId)

  return reply.status(204).send()
}
