import { schema } from '@/db/schema'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const createUserBodySchema = z.object({
  username: z.string().min(3, 'Username is required.'),
  email: z.string().email('Email is invalid.'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
})

export const createUserResponseSchema = {
  409: z
    .object({
      message: z.string(),
    })
    .describe('Email or username is already registered.'),
  500: z
    .object({
      message: z.string(),
    })
    .describe('Fail to hash password.'),
  201: z
    .object({
      user: createInsertSchema(schema.users).omit({ password: true }),
    })
    .describe('User created.'),
}

export const checkAvailableUsernameQuerySchema = z.object({
  username: z.string().min(1, 'Username is required.'),
})

export const checkAvailableUsernameResponseSchema = {
  200: z.object({
    available: z.boolean(),
  }),
  409: z
    .object({
      message: z.string(),
    })
    .describe('Username is already registered.'),
}

export const isEmailAvailableQuerySchema = z.object({
  email: z.string().email('Email is invalid.'),
})

export const isEmailAvailableResponseSchema = {
  200: z.object({
    available: z.boolean(),
  }),
  409: z
    .object({
      message: z.string(),
    })
    .describe('Email is already registered.'),
}

export const getUserByUsernameParamsSchema = z.object({
  username: z.string(),
})

export const getUserByUsernameResponseSchema = {
  200: z.object({
    user: createSelectSchema(schema.users).omit({ password: true }),
  }),
}

export const getUserByIdParamsSchema = z.object({
  id: z.string().uuid(),
})

export const getMeResponseSchema = {
  200: z.object({
    user: createSelectSchema(schema.users).omit({ password: true }),
  }),
}

export const updateUserImageParamsSchema = z.object({
  imagePath: z.string(),
})
