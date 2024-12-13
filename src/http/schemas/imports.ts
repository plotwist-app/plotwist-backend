import { z } from 'zod'

export const createImportRequestSchema = z.object({
  provider: z.enum(['MY_ANIME_LIST', 'LETTERBOXD']),
})

export const createImportResponseSchema = {
  200: z.object({
    message: z.string(),
  }),
}
