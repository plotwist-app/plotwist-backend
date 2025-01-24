import type { FastifyRedis } from '@fastify/redis'
import type { getUserPreferencesService } from '../user-preferences/get-user-preferences'
import type { getUserBestReviewsService } from '../user-stats/get-user-best-reviews'
import { getTMDBMovieRelated } from '../tmdb/get-tmdb-movie-related'
import type { Language, WatchLocale } from '@plotwist_app/tmdb'
import { getTMDBTvRelated } from '../tmdb/get-tmdb-tv-related'
import { getTMDBMovieWatchProviders } from '../tmdb/get-tmdb-movie-watch-providers'
import { getTMDBTvWatchProviders } from '../tmdb/get-tmdb-tv-watch-providers'
import { selectAllUserItems } from '@/db/repositories/user-item-repository'

type UserPreferences = Awaited<
  ReturnType<typeof getUserPreferencesService>
>['userPreferences']

type BestReviews = Awaited<
  ReturnType<typeof getUserBestReviewsService>
>['bestReviews']

type GetUserRecommendationsServiceParams = {
  redis: FastifyRedis
  userPreferences: UserPreferences
  bestReviews: BestReviews
  language: Language
  userId: string
}

const MAX_RECOMMENDATIONS = 10

async function getRecommendations(
  params: Pick<
    GetUserRecommendationsServiceParams,
    'redis' | 'bestReviews' | 'language'
  >
) {
  const { redis, bestReviews, language } = params

  return await Promise.all(
    bestReviews.map(async ({ tmdbId, mediaType }) => {
      if (mediaType === 'MOVIE') {
        return await getTMDBMovieRelated(redis, {
          tmdbId,
          language,
        })
      }

      return await getTMDBTvRelated(redis, {
        tmdbId,
        language,
      })
    })
  )
}

async function formatRecommendations(
  rawRecommendations: Awaited<ReturnType<typeof getRecommendations>>
) {
  const formattedRecommendations = rawRecommendations
    .flat()
    .filter(
      (recommendation, index, self) =>
        self.findIndex(t => t?.id === recommendation?.id) === index
    )
    .sort((a, b) => b?.popularity - a?.popularity)

  return formattedRecommendations
}

async function verifyRecommendations(
  redis: FastifyRedis,
  formattedRecommendations: Awaited<ReturnType<typeof formatRecommendations>>,
  userPreferences: UserPreferences,
  userId: string
) {
  const userItems = await selectAllUserItems(userId)
  const watchRegion = userPreferences?.watchRegion ?? 'US'
  const watchProvidersIds = userPreferences?.watchProvidersIds ?? []

  const verificationResults = await Promise.all(
    formattedRecommendations.map(async recommendation => {
      let watchProviders: WatchLocale | undefined

      if ('title' in recommendation) {
        watchProviders = await getTMDBMovieWatchProviders({
          redis,
          tmdbId: recommendation.id,
        })
      }

      if ('name' in recommendation) {
        watchProviders = await getTMDBTvWatchProviders({
          redis,
          tmdbId: recommendation.id,
        })
      }

      const watchProvidersByRegion =
        watchProviders?.[watchRegion as keyof WatchLocale]

      const isAvailable =
        watchProvidersByRegion?.flatrate?.some(({ provider_id }) =>
          watchProvidersIds.length
            ? watchProvidersIds.includes(provider_id)
            : true
        ) ?? false

      console.log({ isAvailable, watchProvidersIds })

      return {
        recommendation,
        isAvailable,
      }
    })
  )

  return verificationResults
    .filter(
      ({ isAvailable, recommendation }) =>
        isAvailable &&
        !userItems.some(item => item.tmdbId === recommendation.id)
    )
    .map(({ recommendation }) => recommendation)
}

export async function getUserRecommendationsService({
  redis,
  userPreferences,
  bestReviews,
  language,
  userId,
}: GetUserRecommendationsServiceParams) {
  const allRecommendations = await getRecommendations({
    redis,
    bestReviews,
    language,
  })

  const formattedRecommendations =
    await formatRecommendations(allRecommendations)

  const verifiedRecommendations = await verifyRecommendations(
    redis,
    formattedRecommendations,
    userPreferences,
    userId
  )

  return {
    recommendations: verifiedRecommendations.slice(0, MAX_RECOMMENDATIONS),
  }
}
