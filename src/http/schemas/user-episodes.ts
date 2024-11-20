import { schema } from '@/db/schema'
import { UserEpisodeAlreadyRegisteredError } from '@/domain/errors/user-episode-already-registered-error'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const createUserEpisodeBodySchema = createInsertSchema(
  schema.userEpisodes
).omit({ userId: true, watchedAt: true, id: true })

export const createUserEpisodeResponseSchema = {
  201: z
    .object({
      userEpisode: createSelectSchema(schema.userEpisodes),
    })
    .describe('User episode registered.'),
  409: z
    .object({
      message: z
        .string()
        .default(new UserEpisodeAlreadyRegisteredError().message),
    })
    .describe('User episode already registered.'),
}
