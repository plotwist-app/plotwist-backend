import { getUserActivitiesService } from '@/domain/services/user-activities/get-user-activities'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { getUserActivitiesParamsSchema } from '../schemas/user-activities'

export async function getUserActivitiesController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { userId } = getUserActivitiesParamsSchema.parse(request.params)
  const result = await getUserActivitiesService({ userId })

  return reply.status(200).send(result)
}
