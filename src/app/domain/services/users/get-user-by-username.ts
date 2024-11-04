import { db } from '@/db'
import { schema } from '@/db/schema'
import { eq, getTableColumns } from 'drizzle-orm'
import { UserNotFound } from '../errors/user-not-found'

type GetUserByUsernameInput = {
  username: string
}

export async function getUserByUsername({ username }: GetUserByUsernameInput) {
  const { password, ...columns } = getTableColumns(schema.users)

  const [user] = await db
    .select(columns)
    .from(schema.users)
    .where(eq(schema.users.username, username))

  if (!user) {
    return new UserNotFound()
  }

  return { user }
}
