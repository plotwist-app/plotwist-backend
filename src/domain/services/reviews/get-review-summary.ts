import type { getReviewSummaryQuerySchema } from '@/http/schemas/reviews'
import type { FastifyRedis } from '@fastify/redis'
import { getTMDBMovieService } from '../tmdb/get-tmdb-movie'
import { getTMDBTvSeriesService } from '../tmdb/get-tmdb-tv-series'

type GetReviewSummaryServiceParams = {
  redis: FastifyRedis
  values: typeof getReviewSummaryQuerySchema._type
}

async function getTmdbTitle({ redis, values }: GetReviewSummaryServiceParams) {
  const { language, mediaType, tmdbId } = values

  if (mediaType === 'MOVIE') {
    const { title } = await getTMDBMovieService(redis, {
      tmdbId: Number(tmdbId),
      language,
    })

    return title
  }

  const { title } = await getTMDBTvSeriesService(redis, {
    tmdbId: Number(tmdbId),
    language,
  })

  return title
}

function formatTitle(title: string) {
  return title.replace(/ /g, '_').toLowerCase()
}

export async function getReviewSummaryService(
  params: GetReviewSummaryServiceParams
) {
  const { redis, values } = params

  const title = formatTitle(await getTmdbTitle({ redis, values }))

  return {
    message: 'Hello World',
  }
}
