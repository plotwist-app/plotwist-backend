import { z } from 'zod'
import { createSelectSchema } from 'drizzle-zod'
import { schema } from '@/db/schema'

export const loginBodySchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .default('password123'),
})

export const loginResponseSchema = {
  200: z.object({
    token: z.string(),
    user: createSelectSchema(schema.users).omit({ password: true }),
  }),
  400: z
    .object({
      message: z.string(),
    })
    .describe('Invalid email or password.'),
}
