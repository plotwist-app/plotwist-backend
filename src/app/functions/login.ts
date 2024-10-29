import { makeLeft, makeRight } from '@/core/either'
import { db } from '@/db'
import { schema } from '@/db/schema'
import type { loginRouteBodySchema } from '@/http/routes/login'
import { eq } from 'drizzle-orm'
import type { z } from 'zod'
import { InvalidEmailError } from '../errors/invalid-email-error'
import { comparePassword } from '@/utils/password'
import { InvalidPasswordError } from '../errors/invalid-password-error'

type LoginInput = z.infer<typeof loginRouteBodySchema>

export async function login({ email, password }: LoginInput) {
  const [user] = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.email, email))

  if (!user) {
    return makeLeft(new InvalidEmailError())
  }

  const isValidPassword = await comparePassword(password, user.password)

  if (!isValidPassword) {
    return makeLeft(new InvalidPasswordError())
  }

  return makeRight({ user })
}
