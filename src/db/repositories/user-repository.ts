import { db } from '@/db'
import { schema } from '@/db/schema'
import type { InsertUserModel } from '@/domain/entities/user'
import type { UpdateUserInput } from '@/domain/services/users/update-user'
import { trace } from '@opentelemetry/api'
import { eq, sql } from 'drizzle-orm'

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
  const tracer = trace.getTracer('user-repository')

  const span = tracer.startSpan('insertUser', {
    attributes: {
      'user.username': username,
      'user.email': email,
    },
  })

  const [user] = await db
    .insert(schema.users)
    .values({
      username,
      email,
      password,
    })
    .returning()

  console.log('user inserted')

  span.setAttribute('user.id', user.id)
  span.setStatus({ code: 1 })
  span.end()

  return user
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
