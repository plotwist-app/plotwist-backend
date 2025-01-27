import { generateUserRecommendationsService } from '@/domain/services/user-recommendations/generate-user-recommendations'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function sendUserRecommendationsEmailController(
  _request: FastifyRequest,
  reply: FastifyReply,
  redis: FastifyRedis
) {
  try {
    await generateUserRecommendationsService(redis)
  } catch (error) {
    console.error(error)
    return reply.status(500).send({
      message: 'Error generating user recommendations',
    })
  }
}
