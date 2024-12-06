import { schema } from '@/db/schema'
import { createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const createFollowBodySchema = z.object({
  userId: z.string(),
})

export const getFollowQuerySchema = z.object({
  userId: z.string(),
})

export const getFollowResponseSchema = {
  200: z.object({
    follow: createSelectSchema(schema.followers).nullable(),
  }),
}

export const deleteFollowBodySchema = z.object({
  userId: z.string(),
})
