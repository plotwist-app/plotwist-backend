import { z } from 'zod'

export const getUserDefaultSchema = z.object({
  id: z.string(),
})

export const getUserStatsResponseSchema = {
  200: z.object({
    followersCount: z.number(),
    followingCount: z.number(),
    watchedMoviesCount: z.number(),
    watchedSeriesCount: z.number(),
  }),
}

export const getUserTotalHoursResponseSchema = {
  200: z.object({
    totalHours: z.number(),
  }),
}

export const getUserReviewsCountResponseSchema = {
  200: z.object({
    reviewsCount: z.number(),
  }),
}
