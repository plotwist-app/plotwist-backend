import type { InsertLike } from '@/domain/entities/likes'
import { db } from '..'
import { schema } from '../schema'
import { eq, getTableColumns } from 'drizzle-orm'

export async function insertLike(values: InsertLike) {
  return db.insert(schema.likes).values(values).returning()
}

export async function deleteLike(id: string) {
  return db.delete(schema.likes).where(eq(schema.likes.id, id))
}

export async function selectLikes(entityId: string) {
  return db
    .select({
      ...getTableColumns(schema.likes),
      user: {
        id: schema.users.id,
        username: schema.users.username,
        imagePath: schema.users.imagePath,
        subscriptionType: schema.users.subscriptionType,
      },
    })
    .from(schema.likes)
    .where(eq(schema.likes.entityId, entityId))
    .leftJoin(schema.users, eq(schema.likes.userId, schema.users.id))
}
