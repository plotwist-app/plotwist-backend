import { selectUserItems } from '@/db/repositories/user-item-repository'
import { getTMDBMovieService } from '../tmdb/get-tmdb-movie'
import type { FastifyRedis } from '@fastify/redis'
import type { Language } from '@plotwist_app/tmdb'
import { getTMDBTvSeriesService } from '../tmdb/get-tmdb-tv-series'

type GetUserWatchedGenresServiceInput = {
  userId: string
  redis: FastifyRedis
  language: Language
}

export async function getUserWatchedGenresService({
  userId,
  redis,
  language,
}: GetUserWatchedGenresServiceInput) {
  const watchedItems = await selectUserItems({ userId, status: 'WATCHED' })
  const genreCount = new Map()

  await Promise.all(
    watchedItems.map(async item => {
      const { genres } =
        item.mediaType === 'MOVIE'
          ? await getTMDBMovieService(redis, {
              tmdbId: item.tmdbId,
              returnGenres: true,
              language,
            })
          : await getTMDBTvSeriesService(redis, {
              tmdbId: item.tmdbId,
              returnGenres: true,
              language,
            })

      if (genres) {
        for (const genre of genres) {
          const currentCount = genreCount.get(genre.name) || 0
          genreCount.set(genre.name, currentCount + 1)
        }
      }
    })
  )

  const totalGenres = Array.from(genreCount.values()).reduce(
    (acc, count) => acc + count,
    0
  )

  const genres = Array.from(genreCount)
    .map(([name, count]) => ({
      name,
      count,
      percentage: (count / totalGenres) * 100,
    }))
    .sort((a, b) => b.count - a.count)

  return { genres }
}
