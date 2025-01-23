import { db } from '..'
import { eq, or } from 'drizzle-orm'
import { schema } from '@/db/schema'

export async function findUserByEmailOrUsername(login?: string) {
  const [user] = await db
    .select()
    .from(schema.users)
    .where(
      or(
        eq(schema.users.email, login ?? ''),
        eq(schema.users.username, login ?? '')
      )
    )

  return user
}
