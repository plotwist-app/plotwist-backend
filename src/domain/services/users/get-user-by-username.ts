import { db } from '@/db'
import { schema } from '@/db/schema'
import { getTableColumns, sql } from 'drizzle-orm'
import { UserNotFoundError } from '../../errors/user-not-found'

type GetUserByUsernameInput = {
  username: string
}

export async function getUserByUsername({ username }: GetUserByUsernameInput) {
  const { password, ...columns } = getTableColumns(schema.users)

  const [user] = await db
    .select(columns)
    .from(schema.users)
    .where(sql`LOWER(${schema.users.username}) = LOWER(${username})`)

  if (!user) {
    return new UserNotFoundError()
  }

  return { user }
}
