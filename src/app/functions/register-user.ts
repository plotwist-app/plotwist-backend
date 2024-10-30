import { makeLeft, makeRight } from '@/core/either'
import { db } from '@/db'
import { schema } from '@/db/schema'
import { PgIntegrityConstraintViolation } from '@/db/utils/postgres-errors'
import { hashPassword } from '@/utils/password'
import postgres from 'postgres'
import { EmailOrUsernameAlreadyRegisteredError } from '../errors/email-or-username-already-registered-error'
import { HashPasswordError } from '../errors/hash-password-error'

type RegisterUserInput = {
  username: string
  email: string
  password: string
}

export async function registerUser({
  username,
  email,
  password,
}: RegisterUserInput) {
  let hashedPassword: string

  try {
    hashedPassword = await hashPassword(password)
  } catch {
    return makeLeft(new HashPasswordError())
  }

  try {
    const [user] = await db
      .insert(schema.users)
      .values({
        username,
        email,
        password: hashedPassword,
      })
      .returning()

    const { password: removedPassword, ...formattedUser } = user

    return makeRight({ user: formattedUser })
  } catch (error) {
    const isEmailOrUsernameAlreadyRegistered =
      error instanceof postgres.PostgresError &&
      error.code === PgIntegrityConstraintViolation.UniqueViolation

    if (isEmailOrUsernameAlreadyRegistered) {
      return makeLeft(new EmailOrUsernameAlreadyRegisteredError())
    }

    throw error
  }
}
