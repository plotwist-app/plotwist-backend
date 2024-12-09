import { config } from '@/env'
import { S3Client } from '@aws-sdk/client-s3'

export const r2Storage = new S3Client({
  region: 'auto',
  endpoint: `https://${config.cloudflare.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: config.cloudflare.CLOUDFLARE_ACCESS_KEY_ID,
    secretAccessKey: config.cloudflare.CLOUDFLARE_SECRET_ACCESS_KEY,
  },
})
