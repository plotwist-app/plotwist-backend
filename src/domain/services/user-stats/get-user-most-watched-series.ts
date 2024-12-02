import { selectMostWatched } from '@/db/repositories/user-episode'
import { getTMDBTvSeriesService } from '../tmdb/get-tmdb-tv-series'
import type { FastifyRedis } from '@fastify/redis'
import type { Language } from '@plotwist_app/tmdb'

type GetUserMostWatchedSeriesServiceInput = {
  userId: string
  redis: FastifyRedis
  language: Language
}

export async function getUserMostWatchedSeriesService({
  userId,
  language,
  redis,
}: GetUserMostWatchedSeriesServiceInput) {
  const mostWatchedSeries = await selectMostWatched(userId)

  const formattedMostWatchedSeries = await Promise.all(
    mostWatchedSeries.map(async ({ count, tmdbId }) => {
      const data = await getTMDBTvSeriesService(redis, {
        language: language,
        tmdbId: tmdbId,
      })

      return {
        episodes: count,
        id: tmdbId,
        ...data,
      }
    })
  )

  return { mostWatchedSeries: formattedMostWatchedSeries }
}
