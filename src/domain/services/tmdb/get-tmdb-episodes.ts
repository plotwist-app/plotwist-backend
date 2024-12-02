import { tmdb } from '@/domain/entities/tmdb'
import type { FastifyRedis } from '@fastify/redis'
import type {
  Language,
  SeasonDetails,
} from '@plotwist_app/tmdb'

type GetTMDBEpisodesServiceInput = {
  tmdbId: number
  seasonNumber: number
  language: Language
}

const ONE_WEEK_IN_SECONDS = 7 * 24 * 60 * 60

export async function getTMDBEpisodesService(
  redis: FastifyRedis,
  { tmdbId, seasonNumber, language }: GetTMDBEpisodesServiceInput
) {
  const cacheKey = `season:${tmdbId}:${seasonNumber}:${language}`
  const cachedResult = await redis.get(cacheKey)

  if (cachedResult) {
    const data = JSON.parse(cachedResult) as SeasonDetails

    return { episodes: data.episodes }
  }

  const data = await tmdb.season.details(tmdbId, seasonNumber, language)
  await redis.set(cacheKey, JSON.stringify(data), 'EX', ONE_WEEK_IN_SECONDS)

  return {
    episodes: data.episodes,
  }
}
