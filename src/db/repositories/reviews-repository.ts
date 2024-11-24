import { db } from '@/db'
import { schema } from '@/db/schema'
import type { InsertReviewModel } from '@/domain/entities/review'
import type { GetDetailedReviewsInput } from '@/domain/services/reviews/get-detailed-reviews'
import type { GetReviewsServiceInput } from '@/domain/services/reviews/get-reviews'
import type { UpdateReviewInput } from '@/domain/services/reviews/update-review'
import { and, desc, eq, getTableColumns, sql } from 'drizzle-orm'

export async function insertReview(params: InsertReviewModel) {
  return db.insert(schema.reviews).values(params).returning()
}

export async function selectReviewsWithUser({
  mediaType,
  tmdbId,
  authenticatedUserId,
}: GetReviewsServiceInput) {
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
        eq(schema.reviews.tmdbId, tmdbId),
        eq(schema.reviews.mediaType, mediaType)
      )
    )
    .leftJoin(schema.users, eq(schema.reviews.userId, schema.users.id))
    .orderBy(desc(schema.reviews.createdAt))
}

export async function selectReviews({
  userId,
  language,
  limit,
}: GetDetailedReviewsInput) {
  return db
    .select({
      ...getTableColumns(schema.reviews),
      user: {
        id: schema.users.id,
        username: schema.users.username,
        imagePath: schema.users.imagePath,
      },
    })
    .from(schema.reviews)
    .orderBy(desc(schema.reviews.createdAt))
    .limit(Number(limit))
    .where(
      and(
        userId ? eq(schema.reviews.userId, userId) : undefined,
        language ? eq(schema.reviews.language, language) : undefined
      )
    )
    .leftJoin(schema.users, eq(schema.reviews.userId, schema.users.id))
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
