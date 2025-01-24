import { db } from '@/db'
import { schema } from '@/db/schema'
import type { InsertUserModel } from '@/domain/entities/user'
import type { UpdateUserInput } from '@/domain/services/users/update-user'
import { eq, like, sql } from 'drizzle-orm'

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
    })
    .from(schema.users)
    .where(like(schema.users.username, `%${username}%`))
}
