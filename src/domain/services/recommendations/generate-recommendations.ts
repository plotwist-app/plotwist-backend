import { db } from '@/db'
import { schema } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { getTMDBDataService } from '../tmdb/get-tmdb-data'
import type { FastifyRedis } from '@fastify/redis'

type GenerateRecommendationsServiceInput = {
  redis: FastifyRedis
}

export async function generateRecommendationsService({
  redis,
}: GenerateRecommendationsServiceInput) {
  const users = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.username, 'henrique'))

  for (const user of users) {
    const reviews = await db
      .select()
      .from(schema.reviews)
      .where(eq(schema.reviews.userId, user.id))

    for (const review of reviews) {
      const data = await getTMDBDataService(redis, {
        language: 'en-US',
        mediaType: review.mediaType,
        tmdbId: review.tmdbId,
      })

      console.log({ data })
    }
  }

  return
}
