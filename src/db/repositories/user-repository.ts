import { db } from '@/db'
import { schema } from '@/db/schema'
import type { InsertUserModel } from '@/domain/entities/user'
import type { UpdateUserInput } from '@/domain/services/users/update-user'
import { desc, eq, like, sql } from 'drizzle-orm'

export async function getUserByEmail(email: string) {
  return db
    .select()
    .from(schema.users)
    .where(sql`LOWER(${schema.users.email}) = LOWER(${email})`)
}

export async function getUserById(id: string) {
  return db.select().from(schema.users).where(eq(schema.users.id, id))
}

export async function getUserByUsername(username: string) {
  return db
    .select()
    .from(schema.users)
    .where(sql`LOWER(${schema.users.username}) = LOWER(${username})`)
}

export async function insertUser({
  email,
  password,
  username,
}: InsertUserModel) {
  return db
    .insert(schema.users)
    .values({
      username,
      email,
      password,
    })
    .returning()
}

export async function updateUserSubscription(
  userId: string,
  subscriptionType: 'PRO' | 'MEMBER'
) {
  return db
    .update(schema.users)
    .set({ subscriptionType: subscriptionType })
    .where(eq(schema.users.id, userId))
    .returning()
}

export async function updateUser(userId: string, data: UpdateUserInput) {
  return db
    .update(schema.users)
    .set(data)
    .where(eq(schema.users.id, userId))
    .returning()
}

export async function updateUserPassword(userId: string, password: string) {
  return db
    .update(schema.users)
    .set({
      password: password,
      isLegacy: false,
    })
    .where(eq(schema.users.id, userId))
}

export async function listUsersByUsernameLike(username: string) {
  return db
    .select({
      id: schema.users.id,
      username: schema.users.username,
      avatarUrl: schema.users.avatarUrl,
      isFollowed: sql<boolean>`CASE WHEN ${schema.followers.followedId} = ${schema.users.id} THEN true ELSE false END`,
    })
    .from(schema.users)
    .leftJoin(
      schema.followers,
      eq(schema.followers.followedId, schema.users.id)
    )
    .where(like(schema.users.username, `%${username}%`))
    .orderBy(
      desc(
        sql`CASE WHEN ${schema.followers.followedId} = ${schema.users.id} THEN 1 ELSE 0 END`
      )
    )
    .limit(10)
}
