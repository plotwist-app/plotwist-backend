import type {
  InsertUserItem,
  SelectAllUserItems,
  SelectUserItems,
} from '@/domain/entities/user-item'
import type { GetUserItemInput } from '@/domain/services/user-items/get-user-item'

import { and, desc, eq, getTableColumns, lte, sql } from 'drizzle-orm'
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

export async function selectUserItems({
  userId,
  status,
  pageSize,
  cursor,
}: SelectUserItems) {
  return db
    .select()
    .from(schema.userItems)
    .where(
      and(
        cursor
          ? lte(
              sql`DATE_TRUNC('milliseconds', ${schema.userItems.updatedAt})`,
              cursor
            )
          : undefined,
        eq(schema.userItems.userId, userId),
        eq(schema.userItems.status, status)
      )
    )
    .orderBy(desc(schema.userItems.updatedAt))
    .limit(pageSize + 1)
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

function buildDynamicWhere({
  status,
  userId,
  rating,
  mediaType,
}: ListAllUserItems) {
  const conditions = []

  if (userId) {
    conditions.push(eq(schema.userItems.userId, userId))
  }

  if (status && status !== 'all') {
    conditions.push(eq(schema.userItems.status, status))
  }

  if (mediaType) {
    const dbMediaType = mediaType === 'tv' ? 'TV_SHOW' : 'MOVIE'
    conditions.push(eq(schema.userItems.mediaType, dbMediaType))
  }

  return conditions.length > 0 ? and(...conditions) : undefined
}

function buildDynamicOrderBy({
  orderBy,
  orderDirection = 'desc',
}: ListAllUserItems) {
  if (!orderBy) {
    return [desc(schema.userItems.updatedAt)]
  }

  // Only allow specific columns for ordering
  const validOrderColumns = {
    id: schema.userItems.id,
    tmdbId: schema.userItems.tmdbId,
    mediaType: schema.userItems.mediaType,
    status: schema.userItems.status,
    addedAt: schema.userItems.addedAt,
    updatedAt: schema.userItems.updatedAt,
  } as const

  const column = validOrderColumns[orderBy as keyof typeof validOrderColumns]
  if (!column) {
    return [desc(schema.userItems.updatedAt)]
  }

  return [orderDirection === 'desc' ? desc(column) : asc(column)]
}

export async function selectAllUserItemsByStatus(params: ListAllUserItems) {
  const { id, tmdbId, mediaType } = getTableColumns(schema.userItems)

  if (params.rating) {
    const userItemsWithRating = db
      .select({
        id: schema.userItems.id,
        tmdbId: schema.userItems.tmdbId,
        mediaType: schema.userItems.mediaType,
      })
      .from(schema.userItems)
      .innerJoin(
        schema.reviews,
        and(
          eq(schema.reviews.userId, params.userId),
          eq(schema.reviews.tmdbId, schema.userItems.tmdbId),
          eq(schema.reviews.mediaType, schema.userItems.mediaType),
          eq(schema.reviews.rating, params.rating)
        )
      )
      .where(buildDynamicWhere(params))
      .orderBy(...buildDynamicOrderBy(params))

    return userItemsWithRating
  }

  return db
    .select({
      id,
      tmdbId,
      mediaType,
    })
    .from(schema.userItems)
    .where(buildDynamicWhere(params))
    .orderBy(...buildDynamicOrderBy(params))
}

export async function selectAllUserItems(userId: string) {
  return db
    .select({
      id: schema.userItems.id,
      tmdbId: schema.userItems.tmdbId,
      mediaType: schema.userItems.mediaType,
    })
    .from(schema.userItems)
    .where(eq(schema.userItems.userId, userId))
}
