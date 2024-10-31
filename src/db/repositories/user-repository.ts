import { db } from '@/db'
import { schema } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function getUserByEmail(email: string) {
  return db.select().from(schema.users).where(eq(schema.users.email, email))
}
