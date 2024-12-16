import type { InsertUserItem } from '@/domain/entities/user-item'
import type { GetUserItemInput } from '@/domain/services/user-items/get-user-item'
import type { GetUserItemsInput } from '@/domain/services/user-items/get-user-items'

import { and, desc, eq, sql } from 'drizzle-orm'
import { db } from '..'
import { schema } from '../schema'

export async function upsertUserItem({
  mediaType,
  tmdbId,
  userId,
  status,
}: InsertUserItem) {
  return db.execute(
    sql`
        INSERT INTO ${schema.userItems} (media_type, tmdb_id, user_id, status)
        VALUES (${mediaType}, ${tmdbId}, ${userId}, ${status})
        ON CONFLICT (media_type, tmdb_id, user_id)
        DO UPDATE SET 
          status = ${status},
          updated_at = NOW() 
        RETURNING *
      `
  )
}

export async function selectUserItems({ userId, status }: GetUserItemsInput) {
  return db
    .select()
    .from(schema.userItems)
    .where(
      and(
        eq(schema.userItems.userId, userId),
        eq(schema.userItems.status, status)
      )
    )
    .orderBy(desc(schema.userItems.updatedAt))
}

export async function deleteUserItem(id: string) {
  return db
    .delete(schema.userItems)
    .where(eq(schema.userItems.id, id))
    .returning()
}

export async function selectUserItem({
  userId,
  mediaType,
  tmdbId,
}: GetUserItemInput) {
  return db
    .select()
    .from(schema.userItems)
    .where(
      and(
        eq(schema.userItems.userId, userId),
        eq(schema.userItems.mediaType, mediaType),
        eq(schema.userItems.tmdbId, tmdbId)
      )
    )
    .limit(1)
}

export async function selectUserItemStatus(userId: string) {
  return db
    .select({
      status: schema.userItems.status,
      count: sql`COUNT(*)::int`,
      percentage: sql`(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER ())::float`,
    })
    .from(schema.userItems)
    .where(eq(schema.userItems.userId, userId))
    .groupBy(schema.userItems.status)
}
