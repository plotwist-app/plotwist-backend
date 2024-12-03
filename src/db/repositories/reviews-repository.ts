import { db } from '@/db'
import { schema } from '@/db/schema'
import type { InsertReviewModel } from '@/domain/entities/review'
import type { GetReviewsServiceInput } from '@/domain/services/reviews/get-reviews'
import type { UpdateReviewInput } from '@/domain/services/reviews/update-review'
import {
  and,
  count,
  desc,
  eq,
  getTableColumns,
  gte,
  lte,
  type SQL,
  sql,
} from 'drizzle-orm'

export async function insertReview(params: InsertReviewModel) {
  return db.insert(schema.reviews).values(params).returning()
}

export async function selectReviews({
  mediaType,
  tmdbId,
  userId,
  authenticatedUserId,
  limit = 50,
  orderBy,
  startDate,
  endDate,
}: GetReviewsServiceInput) {
  const orderCriteria = [
    orderBy === 'likeCount'
      ? desc(
          sql`(
            SELECT COUNT(*) 
            FROM ${schema.likes} 
            WHERE ${schema.likes.entityId} = ${schema.reviews.id}
          )`
        )
      : undefined,
    desc(schema.reviews.createdAt),
  ].filter(Boolean) as SQL<unknown>[]

  return db
    .select({
      ...getTableColumns(schema.reviews),
      user: {
        id: schema.users.id,
        username: schema.users.username,
        imagePath: schema.users.imagePath,
      },
      likeCount:
        sql`(SELECT COUNT(*)::int FROM ${schema.likes} WHERE ${schema.likes.entityId} = ${schema.reviews.id})`.as(
          'likeCount'
        ),
      replyCount:
        sql`(SELECT COUNT(*)::int FROM ${schema.reviewReplies} WHERE ${schema.reviewReplies.reviewId} = ${schema.reviews.id})`.as(
          'replyCount'
        ),
      userLike: authenticatedUserId
        ? sql`(
               SELECT json_build_object(
                 'id', ${schema.likes.id},
                 'entityId', ${schema.likes.entityId},
                 'userId', ${schema.likes.userId},
                 'createdAt', ${schema.likes.createdAt}
               )
               FROM ${schema.likes}
               WHERE ${schema.likes.entityId} = ${schema.reviews.id}
               AND ${schema.likes.userId} = ${authenticatedUserId}
               LIMIT 1
             )`.as('userLike')
        : sql`null`.as('userLike'),
    })
    .from(schema.reviews)
    .where(
      and(
        tmdbId ? eq(schema.reviews.tmdbId, tmdbId) : undefined,
        mediaType ? eq(schema.reviews.mediaType, mediaType) : undefined,
        userId ? eq(schema.reviews.userId, userId) : undefined,
        startDate ? gte(schema.reviews.createdAt, startDate) : undefined,
        endDate ? lte(schema.reviews.createdAt, endDate) : undefined
      )
    )
    .leftJoin(schema.users, eq(schema.reviews.userId, schema.users.id))
    .orderBy(...orderCriteria)
    .limit(limit)
}

export async function deleteReview(id: string) {
  return db.delete(schema.reviews).where(eq(schema.reviews.id, id)).returning()
}

export async function updateReview({
  id,
  rating,
  review,
  hasSpoilers,
}: UpdateReviewInput) {
  return db
    .update(schema.reviews)
    .set({ rating, review, hasSpoilers })
    .where(eq(schema.reviews.id, id))
    .returning()
}

export async function getReviewById(id: string) {
  return db.select().from(schema.reviews).where(eq(schema.reviews.id, id))
}

export async function selectReviewsCount(userId?: string) {
  return db
    .select({ count: count() })
    .from(schema.reviews)
    .where(userId ? eq(schema.reviews.userId, userId) : undefined)
}

export async function selectBestReviews(userId: string) {
  return db
    .select()
    .from(schema.reviews)
    .where(and(eq(schema.reviews.userId, userId), eq(schema.reviews.rating, 5)))
    .orderBy(desc(schema.reviews.rating), desc(schema.reviews.createdAt))
}
