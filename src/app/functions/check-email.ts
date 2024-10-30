import { db } from '@/db'
import { schema } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { EmailAlreadyRegisteredError } from '../errors/email-already-registered'

type CheckEmailInput = {
  email: string
}

export async function checkEmail({ email }: CheckEmailInput) {
  const [user] = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.email, email))

  if (user) {
    return new EmailAlreadyRegisteredError()
  }

  return { available: true }
}
