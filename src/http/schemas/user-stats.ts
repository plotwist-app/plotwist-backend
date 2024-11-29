import { z } from 'zod'

export const getUserDefaultSchema = z.object({
  id: z.string(),
})

export const getUserStatsParamsSchema = getUserDefaultSchema

export const getUserStatsResponseSchema = {
  200: z.object({
    followersCount: z.number(),
    followingCount: z.number(),
    watchedMoviesCount: z.number(),
    watchedSeriesCount: z.number(),
  }),
}

export const getUserTotalHoursParamsSchema = getUserDefaultSchema
export const getUserTotalHoursResponseSchema = {
  200: z.object({
    totalHours: z.number(),
  }),
}
