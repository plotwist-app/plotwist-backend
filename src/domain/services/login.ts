import { db } from '@/db'
import { schema } from '@/db/schema'
import type { loginBodySchema } from '@/http/schemas/login'
import { comparePassword } from '@/utils/password'
import { eq } from 'drizzle-orm'
import type { z } from 'zod'
import { InvalidEmailError } from '../errors/invalid-email-error'
import { InvalidPasswordError } from '../errors/invalid-password-error'
import { generateMagicLinkTokenService } from './magic-link/generate-magic-link'
import { sendMagicLinkEmailService } from './magic-link/send-magic-link-email'

type LoginInput = z.infer<typeof loginBodySchema>

export async function loginService({ email, password, url }: LoginInput) {
  const [user] = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.email, email))

  if (!user) {
    return new InvalidEmailError()
  }

  if (user.isLegacy) {
    const { token } = await generateMagicLinkTokenService(user.id)
    await sendMagicLinkEmailService({ email: user.email, token, url })

    return { status: 'magic_link_sent' }
  }

  const isValidPassword = await comparePassword(password, user.password)
  if (!isValidPassword) {
    return new InvalidPasswordError()
  }

  const { password: removedPassword, ...formattedUser } = user
  return { user: formattedUser }
}
