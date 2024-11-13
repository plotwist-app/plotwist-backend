import { z } from 'zod'

export const loginBodySchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .default('password123'),
  url: z.string().optional(),
})

export const loginResponseSchema = {
  200: z.object({
    token: z.string().optional(),
    status: z.string().optional(),
  }),
  400: z
    .object({
      message: z.string(),
    })
    .describe('Invalid email or password.'),
}
