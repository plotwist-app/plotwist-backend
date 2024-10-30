import { z } from 'zod'

export const registerUserBodySchema = z.object({
  username: z.string().min(1, 'Username is required.'),
  email: z.string().email('Email is invalid.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .default('password123'),
})
