import { z } from 'zod'

export const createImportRequestSchema = z.object({
  provider: z.enum(['my-anime-list', 'letterboxd']),
})

export const createImportResponseSchema = {
  200: z.string(),
}
