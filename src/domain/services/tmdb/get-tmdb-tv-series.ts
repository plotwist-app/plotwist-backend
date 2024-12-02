import { tmdb } from '@/domain/entities/tmdb'
import type { FastifyRedis } from '@fastify/redis'
import type { Language, TvSerieDetails } from '@plotwist_app/tmdb'

type GetTMDBTvSeriesServiceInput = {
  tmdbId: number
  language: Language
  returnSeasons?: boolean
  returnGenres?: boolean
}

const ONE_WEEK_IN_SECONDS = 7 * 24 * 60 * 60

export async function getTMDBTvSeriesService(
  redis: FastifyRedis,
  {
    tmdbId,
    language,
    returnSeasons = false,
    returnGenres = false,
  }: GetTMDBTvSeriesServiceInput
) {
  const cacheKey = `TV_SHOW:${tmdbId}:${language}`
  const cachedResult = await redis.get(cacheKey)

  if (cachedResult) {
    const data = JSON.parse(cachedResult) as TvSerieDetails
    return {
      title: data.name,
      posterPath: data.poster_path,
      backdropPath: data.backdrop_path,
      ...(returnSeasons && { seasons: data.seasons }),
      ...(returnGenres && { genres: data.genres }),
    }
  }

  const data = await tmdb.tv.details(tmdbId, language)
  await redis.set(cacheKey, JSON.stringify(data), 'EX', ONE_WEEK_IN_SECONDS)

  return {
    title: data.name,
    posterPath: data.poster_path,
    backdropPath: data.backdrop_path,
    ...(returnSeasons && { seasons: data.seasons }),
    ...(returnGenres && { genres: data.genres }),
  }
}
