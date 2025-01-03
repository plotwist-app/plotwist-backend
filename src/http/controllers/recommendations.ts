import { generateRecommendationsService } from '@/domain/services/recommendations/generate-recommendations'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function generateRecommendationsController(
  request: FastifyRequest,
  reply: FastifyReply,
  redis: FastifyRedis
) {
  await generateRecommendationsService({ redis })

  return reply.status(200).send()
}
