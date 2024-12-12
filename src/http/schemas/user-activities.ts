import { z } from 'zod'

export const getUserActivitiesParamsSchema = z.object({
  userId: z.string(),
})
