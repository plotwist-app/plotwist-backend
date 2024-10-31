import { z } from 'zod'

export const createUserBodySchema = z.object({
  username: z.string().min(3, 'Username is required.'),
  email: z.string().email('Email is invalid.'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
})

export const checkAvailableUsernameQuerySchema = z.object({
  username: z.string().min(1, 'Username is required.'),
})

export const isEmailAvailableQuerySchema = z.object({
  email: z.string().email('Email is invalid.'),
})
