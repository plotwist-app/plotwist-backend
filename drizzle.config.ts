import { env } from '@/env'
import type { Config } from 'drizzle-kit'

export default {
  schema: 'src/db/schema/index.ts',
  out: 'priv/migrations',
  dialect: 'postgresql',
  dbCredentials: { url: env.DATABASE_URL },
  schemaFilter: ['public'],
  migrations: {
    prefix: 'timestamp',
  },
} satisfies Config
