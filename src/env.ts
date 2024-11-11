import { z } from 'zod'

export const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  BASE_URL: z.string().default('http://localhost:3333'),
  JWT_SECRET: z.string(),

  DATABASE_URL: z.string().url(),
  STRIPE_SECRET_KEY: z.string().optional().default(''),
  TMDB_ACCESS_TOKEN: z.string(),
})

export const env = envSchema.parse(process.env)
