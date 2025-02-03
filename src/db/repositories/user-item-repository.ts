import type {
  InsertUserItem,
  SelectAllUserItems,
  SelectUserItems,
} from '@/domain/entities/user-item'
import type { GetUserItemInput } from '@/domain/services/user-items/get-user-item'

import { and, asc, desc, eq, getTableColumns, lte, sql } from 'drizzle-orm'
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
  orderBy,
  orderDirection,
  mediaType,
  rating,
}: SelectUserItems) {
  const whereConditions = [
    eq(schema.userItems.userId, userId),
    eq(schema.userItems.status, status),
  ]

  if (cursor) {
    whereConditions.push(
      lte(
        sql`DATE_TRUNC('milliseconds', ${schema.userItems.updatedAt})`,
        cursor
      )
    )
  }

  if (mediaType) {
    whereConditions.push(eq(schema.userItems.mediaType, mediaType))
  }

  const query = db
    .select({
      id: schema.userItems.id,
      userId: schema.userItems.userId,
      tmdbId: schema.userItems.tmdbId,
      mediaType: schema.userItems.mediaType,
      status: schema.userItems.status,
      updatedAt: schema.userItems.updatedAt,
      addedAt: schema.userItems.addedAt,
    })
    .from(schema.userItems)
    .where(and(...whereConditions))

  const orderColumn = getOrderColumn(orderBy)
  const items = await query
    .orderBy(
      orderColumn !== schema.reviews.rating
        ? (orderColumn &&
            (orderDirection === 'desc'
              ? desc(orderColumn)
              : asc(orderColumn))) ||
            desc(schema.userItems.updatedAt)
        : desc(schema.userItems.updatedAt)
    )
    .limit(pageSize + 1)

  if (items.length === 0) return items

  const ratings = await db
    .select({
      tmdbId: schema.reviews.tmdbId,
      mediaType: schema.reviews.mediaType,
      rating: schema.reviews.rating,
    })
    .from(schema.reviews)
    .where(
      and(
        eq(schema.reviews.userId, userId),
        rating ? eq(schema.reviews.rating, rating) : undefined
      )
    )

  const itemsWithRatings = items.map(item => {
    const itemRating = ratings.find(
      r => r.tmdbId === item.tmdbId && r.mediaType === item.mediaType
    )
    return {
      ...item,
      rating: itemRating?.rating ?? null,
    }
  })

  if (orderBy === 'rating') {
    itemsWithRatings.sort((a, b) => {
      if (a.rating === null && b.rating === null) return 0
      if (a.rating === null) return 1
      if (b.rating === null) return -1
      return orderDirection === 'desc'
        ? b.rating - a.rating
        : a.rating - b.rating
    })
  }

  return rating
    ? itemsWithRatings.filter(item => item.rating === rating)
    : itemsWithRatings
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

export async function selectAllUserItemsByStatus({
  status,
  userId,
}: SelectAllUserItems) {
  const { id, tmdbId, mediaType } = getTableColumns(schema.userItems)

  return db
    .select({
      id,
      tmdbId,
      mediaType,
    })
    .from(schema.userItems)
    .where(
      and(
        eq(schema.userItems.userId, userId),
        eq(schema.userItems.status, status)
      )
    )
    .orderBy(desc(schema.userItems.updatedAt))
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

function getOrderColumn(orderBy: string) {
  switch (orderBy) {
    case 'updatedAt':
      return schema.userItems.updatedAt
    case 'addedAt':
      return schema.userItems.addedAt
    case 'rating':
      return schema.reviews.rating
  }
}
