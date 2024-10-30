import { db } from '@/db'
import { schema } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { UsernameAlreadyRegisteredError } from '../errors/username-already-registered'

type CheckUsernameInput = {
  username: string
}

export async function checkUsername({ username }: CheckUsernameInput) {
  const [user] = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.username, username))

  if (user) {
    return new UsernameAlreadyRegisteredError()
  }

  return { available: true }
}
