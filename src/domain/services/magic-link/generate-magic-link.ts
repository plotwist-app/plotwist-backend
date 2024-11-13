import { insertMagicToken } from '@/db/repositories/magic-tokens'
import { randomBytes } from 'node:crypto'

const FIFTEEN_MINUTES = new Date(Date.now() + 15 * 60000)

export async function generateMagicLinkTokenService(userId: string) {
  const token = randomBytes(32).toString('hex')
  await insertMagicToken({ token, userId, expiresAt: FIFTEEN_MINUTES })

  return { token }
}
