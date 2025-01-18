import type { getReviewSummaryQuerySchema } from '@/http/schemas/reviews'
import type { FastifyRedis } from '@fastify/redis'
import { getRottenTomatoesReviewsService } from '../rotten-tomatoes/reviews'
import { generateReviewSummary } from '../open-ai/generate-review-summary'
import { getTMDBMovieService } from '../tmdb/get-tmdb-movie'

type GetReviewSummaryServiceParams = {
  redis: FastifyRedis
  values: typeof getReviewSummaryQuerySchema._type
}

const CACHE_EXPIRATION = 60 * 60 * 24 * 30 * 6 // 6 months

async function getTitle({ redis, values }: GetReviewSummaryServiceParams) {
  const { title } = await getTMDBMovieService(redis, {
    language: 'en-US',
    tmdbId: Number(values.tmdbId),
  })

  return title
}

export async function getReviewSummaryService({
  redis,
  values,
}: GetReviewSummaryServiceParams) {
  const { tmdbId, language, mediaType } = values

  const summaryCacheKey = `SUMMARY:${tmdbId}:${mediaType}:${language}`
  const cachedSummary = await redis.get(summaryCacheKey)
  if (cachedSummary) {
    return { summary: cachedSummary }
  }

  const title = await getTitle({
    redis,
    values,
  })

  const reviews = await getRottenTomatoesReviewsService(redis, {
    title,
    mediaType,
  })

  if (reviews.length === 0) {
    return { summary: null }
  }

  const summary = await generateReviewSummary(reviews, language)
  await redis.set(summaryCacheKey, summary, 'EX', CACHE_EXPIRATION)

  return { summary }
}
