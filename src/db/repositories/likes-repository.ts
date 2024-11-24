import type { InsertLike } from '@/domain/entities/likes'
import { db } from '..'
import { schema } from '../schema'

export async function insertLike(values: InsertLike) {
  return db.insert(schema.likes).values(values).returning()
}
