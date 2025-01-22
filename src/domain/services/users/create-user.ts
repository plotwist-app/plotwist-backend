import { insertUser } from '@/db/repositories/user-repository'
import { PgIntegrityConstraintViolation } from '@/db/utils/postgres-errors'
import { hashPassword } from '@/utils/password'
import postgres from 'postgres'
import { EmailOrUsernameAlreadyRegisteredError } from '../../errors/email-or-username-already-registered-error'
import { HashPasswordError } from '../../errors/hash-password-error'
import { type Span, trace } from '@opentelemetry/api'

export type CreateUserInterface = {
  username: string
  email: string
  password: string
}

export async function createUser({
  username,
  email,
  password,
}: CreateUserInterface) {
  const tracer = trace.getTracer('create-user')

  const span = tracer.startSpan('createUser', {
    attributes: {
      'user.username': username,
      'user.email': email,
    },
  })

  let hashedPassword: string

  try {
    hashedPassword = await hashPassword(password)
  } catch {
    span.setAttribute('error.type', 'HASH_PASSWORD_ERROR')
    span.end()
    return new HashPasswordError()
  }

  try {
    const user = await insertUser({
      email,
      password: hashedPassword,
      username,
    })

    span.setAttribute('user.id', user.id)
    span.end()

    const { password: removedPassword, ...formattedUser } = user

    return { user: formattedUser }
  } catch (error) {
    return handleError(span, error as Error)
  }
}

function handleError(span: Span, error: Error) {
  const isEmailOrUsernameAlreadyRegistered =
    error instanceof postgres.PostgresError &&
    error.code === PgIntegrityConstraintViolation.UniqueViolation

  if (isEmailOrUsernameAlreadyRegistered) {
    span.setAttribute('error.type', 'EMAIL_OR_USERNAME_ALREADY_REGISTERED')
    span.end()
    return new EmailOrUsernameAlreadyRegisteredError()
  }

  span.setAttribute('error.type', 'UNKNOWN')
  span.recordException(error)
  span.setStatus({ code: 2, message: error.message })
  span.end()
  throw error
}
