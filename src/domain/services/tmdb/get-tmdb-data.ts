import { tmdb } from '@/domain/entities/tmdb'
import type { FastifyRedis } from '@fastify/redis'
import type { Language } from '@plotwist_app/tmdb'

type GetTMDBDataServiceInput = {
  mediaType: 'TV_SHOW' | 'MOVIE'
  tmdbId: number
  language: Language
}

const ONE_WEEK_IN_SECONDS = 7 * 24 * 60 * 60

export async function getTMDBDataService(
  redis: FastifyRedis,
  input: GetTMDBDataServiceInput
) {
  const { mediaType, language, tmdbId } = input

  const cacheKey = `${mediaType}:${tmdbId}:${language}`
  const cachedResult = await redis.get(cacheKey)

  if (mediaType === 'TV_SHOW') {
    if (cachedResult) {
      const data = JSON.parse(cachedResult)

      return {
        title: data.name,
        posterPath: data.poster_path,
        backdropPath: data.backdrop_path,
      }
    }

    const data = await tmdb.tv.details(tmdbId, language)
    await redis.set(cacheKey, JSON.stringify(data), 'EX', ONE_WEEK_IN_SECONDS)

    return {
      title: data.name,
      posterPath: data.poster_path,
      backdropPath: data.backdrop_path,
    }
  }

  if (cachedResult) {
    const data = JSON.parse(cachedResult)

    return {
      title: data.title,
      posterPath: data.poster_path,
      backdropPath: data.backdrop_path,
    }
  }

  const data = await tmdb.movies.details(tmdbId, language)
  console.log({ data })
  await redis.set(cacheKey, JSON.stringify(data), 'EX', ONE_WEEK_IN_SECONDS)

  return {
    title: data.title,
    posterPath: data.poster_path,
    backdropPath: data.backdrop_path,
  }
}
