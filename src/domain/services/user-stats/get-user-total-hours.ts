import type { FastifyRedis } from '@fastify/redis'
import { getUserItemsService } from '../user-items/get-user-items'
import { getTMDBMovieService } from '../tmdb/get-tmdb-movie'
import { getUserEpisodesService } from '../user-episodes/get-user-episodes'

export async function getUserTotalHoursService(
  userId: string,
  redis: FastifyRedis
) {
  const watchedItems = await getUserItemsService({
    userId,
    status: 'WATCHED',
  })
  const movieRuntimes = await getMovieRuntimes(watchedItems, redis)
  const movieTotalHours = sumRuntimes(movieRuntimes)

  const watchedEpisodes = await getUserEpisodesService({ userId })
  const episodeTotalHours = sumRuntimes(
    watchedEpisodes.userEpisodes.map(ep => ep.runtime)
  )

  const totalHours = movieTotalHours + episodeTotalHours
  return { totalHours }
}

async function getMovieRuntimes(
  watchedItems: Awaited<ReturnType<typeof getUserItemsService>>,
  redis: FastifyRedis
) {
  return Promise.all(
    watchedItems.userItems
      .filter(item => item.mediaType === 'MOVIE')
      .map(async item => {
        const { runtime } = await getTMDBMovieService(redis, {
          language: 'en-US',
          tmdbId: item.tmdbId,
          returnRuntime: true,
        })
        return runtime || 0
      })
  )
}

function sumRuntimes(runtimes: number[]): number {
  return runtimes.reduce((acc, curr) => acc + curr, 0) / 60
}
