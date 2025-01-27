import cron from 'node-cron'
import { Redis } from 'ioredis'
import { config } from '@/config'
import { generateUserRecommendationsService } from '@/domain/services/user-recommendations/generate-user-recommendations'
import type { FastifyRedis } from '@fastify/redis'
import { logger } from '@/adapters/logger'

const EVERY_FRIDAY_AT_00_00 = '0 0 * * 5'

export function startRecommendationsCronJob() {
  const redis = new Redis(config.redis.REDIS_URL) as FastifyRedis

  cron.schedule(
    EVERY_FRIDAY_AT_00_00,
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
