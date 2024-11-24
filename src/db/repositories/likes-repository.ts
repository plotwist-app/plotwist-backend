import type { InsertLike } from '@/domain/entities/likes'
import { db } from '..'
import { schema } from '../schema'
import { eq } from 'drizzle-orm'

export async function insertLike(values: InsertLike) {
  return db.insert(schema.likes).values(values).returning()
}

export async function deleteLike(id: string) {
  return db.delete(schema.likes).where(eq(schema.likes.id, id))
}
