import { z } from 'zod'

export const getUserStatsParamsSchema = z.object({
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
