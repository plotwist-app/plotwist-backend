import { z } from 'zod'
import { languageQuerySchema } from './common'

export const getUserRecommendationsSchema = z
  .object({
    userId: z.string().uuid(),
  })
  .merge(languageQuerySchema)
