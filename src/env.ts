import { z } from 'zod'

export const config = {
  cloudflare: loadCloudFlareEnvs(),
  db: loadDatabaseEnvs(),
  app: loadAppEnvs(),
  services: loadServicesEnvs(),
  redis: loadRedisEnvs(),
}

function loadRedisEnvs() {
  const schema = z.object({
    REDIS_URL: z.string().url(),
  })

  return schema.parse(process.env)
}

function loadServicesEnvs() {
  const schema = z.object({
    RESEND_API_KEY: z.string().optional().default('re_123'),
    STRIPE_SECRET_KEY: z.string().optional().default(''),
    TMDB_ACCESS_TOKEN: z.string(),
  })

  return schema.parse(process.env)
}

function loadDatabaseEnvs() {
  const schema = z.object({
    DATABASE_URL: z.string().url(),
  })

  return schema.parse(process.env)
}

function loadAppEnvs() {
  const schema = z.object({
    APP_ENV: z.enum(['dev', 'test', 'production']).optional().default('dev'),
    CLIENT_URL: z.string().nullable(),
    PORT: z.coerce.number().default(3333),
    BASE_URL: z.string().default('http://localhost:3333'),
    JWT_SECRET: z.string(),
  })

  return schema.parse(process.env)
}

function loadCloudFlareEnvs() {
  const schema = z.object({
    CLOUDFLARE_ACCESS_KEY_ID: z.string(),
    CLOUDFLARE_SECRET_ACCESS_KEY: z.string(),
    CLOUDFLARE_BUCKET: z.string(),
    CLOUDFLARE_ACCOUNT_ID: z.string(),
    CLOUDFLARE_PUBLIC_URL: z.string().url(),
  })

  return schema.parse(process.env)
}
