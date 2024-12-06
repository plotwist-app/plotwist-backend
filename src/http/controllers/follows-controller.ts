import type { FastifyReply, FastifyRequest } from 'fastify'
import {
  createFollowBodySchema,
  deleteFollowBodySchema,
  getFollowQuerySchema,
} from '../schemas/follow'
import { createFollowService } from '@/domain/services/follows/create-follow'
import { getFollowService } from '@/domain/services/follows/get-follow'
import { deleteFollowService } from '@/domain/services/follows/delete-follow'

export async function createFollowController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { userId } = createFollowBodySchema.parse(request.body)

  await createFollowService({
    followedId: userId,
    followerId: request.user.id,
  })

  return reply.send(201).send()
}

export async function getFollowController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { userId } = getFollowQuerySchema.parse(request.query)

  const result = await getFollowService({
    followedId: userId,
    followerId: request.user.id,
  })

  return reply.status(200).send(result)
}

export async function deleteFollowController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { userId } = deleteFollowBodySchema.parse(request.body)
  await deleteFollowService({ followedId: userId, followerId: request.user.id })

  return reply.status(204).send()
}
