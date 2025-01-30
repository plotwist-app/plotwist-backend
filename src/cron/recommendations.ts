import { logger } from '@/adapters/logger'
import { config } from '@/config'
import { generateUserRecommendationsService } from '@/domain/services/user-recommendations/generate-user-recommendations'
import type { FastifyRedis } from '@fastify/redis'
import { Redis } from 'ioredis'
import cron from 'node-cron'

const EVERY_FRIDAY_AT_12_00 = '0 12 * * 5'

export function startRecommendationsCronJob() {
  const redis = new Redis(config.redis.REDIS_URL) as FastifyRedis

  cron.schedule(
    EVERY_FRIDAY_AT_12_00,
    async () => {
      try {
        logger.info('Weekly recommendations job started')
        await generateUserRecommendationsService(redis)
        logger.info('Weekly recommendations job completed successfully')
      } catch (error) {
        logger.error({ error }, 'Error running recommendations job')
      }
    },
    {
      timezone: 'UTC',
    }
  )
}
