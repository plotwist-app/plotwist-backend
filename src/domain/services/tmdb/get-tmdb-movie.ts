import { tmdb } from '@/domain/entities/tmdb'
import type { FastifyRedis } from '@fastify/redis'
import type { Language, MovieDetails } from '@plotwist_app/tmdb'

type GetTMDBMovieServiceInput = {
  tmdbId: number
  language: Language
  returnRuntime?: boolean
}

const ONE_WEEK_IN_SECONDS = 7 * 24 * 60 * 60

export async function getTMDBMovieService(
  redis: FastifyRedis,
  { tmdbId, language, returnRuntime = false }: GetTMDBMovieServiceInput
) {
  const cacheKey = `MOVIE:${tmdbId}:${language}`
  const cachedResult = await redis.get(cacheKey)

  if (cachedResult) {
    const data = JSON.parse(cachedResult) as MovieDetails

    return {
      title: data.title,
      posterPath: data.poster_path,
      backdropPath: data.backdrop_path,
      ...(returnRuntime && { runtime: data.runtime }),
    }
  }

  const data = await tmdb.movies.details(tmdbId, language)
  await redis.set(cacheKey, JSON.stringify(data), 'EX', ONE_WEEK_IN_SECONDS)

  return {
    title: data.title,
    posterPath: data.poster_path,
    backdropPath: data.backdrop_path,
    ...(returnRuntime && { runtime: data.runtime }),
  }
}
