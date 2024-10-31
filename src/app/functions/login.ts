import { db } from '@/db'
import { schema } from '@/db/schema'
import { comparePassword } from '@/utils/password'
import { eq } from 'drizzle-orm'
import type { z } from 'zod'
import { InvalidEmailError } from '../errors/invalid-email-error'
import { InvalidPasswordError } from '../errors/invalid-password-error'
import type { loginBodySchema } from '@/http/controllers/login'

type LoginInput = z.infer<typeof loginBodySchema>

export async function login({ email, password }: LoginInput) {
  const [user] = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.email, email))

  if (!user) {
    return new InvalidEmailError()
  }

  const isValidPassword = await comparePassword(password, user.password)

  if (!isValidPassword) {
    return new InvalidPasswordError()
  }

  return { user }
}
