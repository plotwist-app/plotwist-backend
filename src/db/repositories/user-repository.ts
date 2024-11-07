import type { InsertUserModel } from '@/domain/entities/user'
import { db } from '@/db'
import { schema } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function getUserByEmail(email: string) {
  return db.select().from(schema.users).where(eq(schema.users.email, email))
}

export async function getUserById(id: string) {
  return db.select().from(schema.users).where(eq(schema.users.id, id))
}

export async function getUserByUsername(username: string) {
  return db
    .select()
    .from(schema.users)
    .where(eq(schema.users.username, username))
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

export async function updateUserSubscription(userId: string) {
  return db
    .update(schema.users)
    .set({ subscriptionType: 'PRO' })
    .where(eq(schema.users.id, userId))
    .returning()
}

export async function updateUserImage(userId: string, imagePath: string) {
  return db
    .update(schema.users)
    .set({ imagePath })
    .where(eq(schema.users.id, userId))
    .returning()
}

export async function updateUserBanner(userId: string, bannerPath: string) {
  return db
    .update(schema.users)
    .set({ bannerPath })
    .where(eq(schema.users.id, userId))
    .returning()
}
