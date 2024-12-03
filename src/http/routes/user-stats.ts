import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
  getUserStatsController,
  getUserTotalHoursController,
  getUserReviewsCountController,
  getUserMostWatchedSeriesController,
  getUserWatchedGenresController,
  getUserWatchedCastController,
  getUserWatchedCountriesController,
  getUserBestReviewsController,
  getUserItemsStatusController,
} from '../controllers/user-stats'
import {
  getUserBestReviewsResponseSchema,
  getUserDefaultSchema,
  getUserItemsStatusResponseSchema,
  getUserMostWatchedSeriesResponseSchema,
  getUserReviewsCountResponseSchema,
  getUserStatsResponseSchema,
  getUserTotalHoursResponseSchema,
  getUserWatchedCastResponseSchema,
  getUserWatchedCountriesResponseSchema,
  getUserWatchedGenresResponseSchema,
} from '../schemas/user-stats'
import { languageQuerySchema } from '../schemas/common'

const USER_STATS_TAG = ['User stats']

export async function userStatsRoutes(app: FastifyInstance) {
  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'GET',
      url: '/user/:id/stats',
      schema: {
        description: 'Get user stats',
        params: getUserDefaultSchema,
        response: getUserStatsResponseSchema,
        tags: USER_STATS_TAG,
      },
      handler: getUserStatsController,
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'GET',
      url: '/user/:id/total-hours',
      schema: {
        description: 'Get user total hours',
        params: getUserDefaultSchema,
        response: getUserTotalHoursResponseSchema,
        tags: USER_STATS_TAG,
      },
      handler: (request, reply) =>
        getUserTotalHoursController(request, reply, app.redis),
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'GET',
      url: '/user/:id/reviews-count',
      schema: {
        description: 'Get user reviews count',
        params: getUserDefaultSchema,
        response: getUserReviewsCountResponseSchema,
        tags: USER_STATS_TAG,
      },
      handler: getUserReviewsCountController,
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'GET',
      url: '/user/:id/most-watched-series',
      schema: {
        description: 'Get user most watched series',
        params: getUserDefaultSchema,
        query: languageQuerySchema,
        response: getUserMostWatchedSeriesResponseSchema,
        tags: USER_STATS_TAG,
      },
      handler: (request, reply) =>
        getUserMostWatchedSeriesController(request, reply, app.redis),
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'GET',
      url: '/user/:id/watched-genres',
      schema: {
        description: 'Get user watched genres',
        params: getUserDefaultSchema,
        query: languageQuerySchema,
        response: getUserWatchedGenresResponseSchema,
        tags: USER_STATS_TAG,
      },
      handler: (request, reply) =>
        getUserWatchedGenresController(request, reply, app.redis),
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'GET',
      url: '/user/:id/watched-cast',
      schema: {
        description: 'Get user watched cast',
        params: getUserDefaultSchema,
        query: languageQuerySchema,
        response: getUserWatchedCastResponseSchema,
        tags: USER_STATS_TAG,
      },
      handler: (request, reply) =>
        getUserWatchedCastController(request, reply, app.redis),
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'GET',
      url: '/user/:id/watched-countries',
      schema: {
        description: 'Get user watched countries',
        params: getUserDefaultSchema,
        query: languageQuerySchema,
        response: getUserWatchedCountriesResponseSchema,
        tags: USER_STATS_TAG,
      },
      handler: (request, reply) =>
        getUserWatchedCountriesController(request, reply, app.redis),
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'GET',
      url: '/user/:id/best-reviews',
      schema: {
        description: 'Get user best reviews',
        params: getUserDefaultSchema,
        query: languageQuerySchema,
        response: getUserBestReviewsResponseSchema,
        tags: USER_STATS_TAG,
      },
      handler: (request, reply) =>
        getUserBestReviewsController(request, reply, app.redis),
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'GET',
      url: '/user/:id/items-status',
      schema: {
        description: 'Get user items status',
        params: getUserDefaultSchema,
        response: getUserItemsStatusResponseSchema,
        tags: USER_STATS_TAG,
      },
      handler: (request, reply) =>
        getUserItemsStatusController(request, reply, app.redis),
    })
  )
}
