import { z } from 'zod'

export const languageQuerySchema = z.object({
  language: z
    .enum(['en-US', 'es-ES', 'fr-FR', 'de-DE', 'it-IT', 'pt-BR', 'ja-JP'])
    .optional(),
})
