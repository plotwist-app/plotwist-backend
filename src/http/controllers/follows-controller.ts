import type { FastifyReply, FastifyRequest } from 'fastify'
import {
  createFollowBodySchema,
  deleteFollowBodySchema,
  getFollowersQuerySchema,
  getFollowQuerySchema,
} from '../schemas/follow'
import { createFollowService } from '@/domain/services/follows/create-follow'
import { getFollowService } from '@/domain/services/follows/get-follow'
import { deleteFollowService } from '@/domain/services/follows/delete-follow'
import { getFollowersService } from '@/domain/services/follows/get-followers'
import { DomainError } from '@/domain/errors/domain-error'

export async function createFollowController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { userId } = createFollowBodySchema.parse(request.body)

  const result = await createFollowService({
    followedId: userId,
    followerId: request.user.id,
  })

  if (result instanceof DomainError) {
    return reply.status(result.status).send({ message: result.message })
  }

  return reply.send(201).send(result)
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

export async function getFollowersController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { pageSize, ...query } = getFollowersQuerySchema.parse(request.query)

  const result = await getFollowersService({
    ...query,
    pageSize: Number(pageSize),
  })

  return reply.status(200).send(result)
}
