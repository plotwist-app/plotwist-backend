import { makeLeft, makeRight, type Either } from '@/core/either'
import { db } from '@/db'
import { schema } from '@/db/schema'
import postgres from 'postgres'
import { PgIntegrityConstraintViolation } from '@/db/utils/postgres-errors'
import type { InferSelectModel } from 'drizzle-orm'
import { EmailAlreadyRegisteredError } from '../errors/email-already-registered-error'

type RegisterUserInput = {
  name: string
  email: string
}

type RegisterUserOutput = {
  user: InferSelectModel<typeof schema.users>
}

export async function registerUser({
  name,
  email,
}: RegisterUserInput): Promise<
  Either<EmailAlreadyRegisteredError, RegisterUserOutput>
> {
  try {
    const users = await db
      .insert(schema.users)
      .values({ name, email })
      .returning()

    return makeRight({ user: users[0] })
  } catch (err) {
    const isUserAlreadySubscribed =
      err instanceof postgres.PostgresError &&
      err.code === PgIntegrityConstraintViolation.UniqueViolation

    if (!isUserAlreadySubscribed) {
      throw err
    }

    return makeLeft(new EmailAlreadyRegisteredError())
  }
}
