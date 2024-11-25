import { db } from '@/db'
import { schema } from '@/db/schema'
import type { InsertReviewModel } from '@/domain/entities/review'
import type { GetReviewsServiceInput } from '@/domain/services/reviews/get-reviews'
import type { UpdateReviewInput } from '@/domain/services/reviews/update-review'
import { and, desc, eq, getTableColumns, sql } from 'drizzle-orm'

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
        userId ? eq(schema.reviews.userId, userId) : undefined
      )
    )
    .leftJoin(schema.users, eq(schema.reviews.userId, schema.users.id))
    .orderBy(
      orderBy === 'likeCount'
        ? desc(
            sql`(
            SELECT COUNT(*) 
            FROM ${schema.likes} 
            WHERE ${schema.likes.entityId} = ${schema.reviews.id}
          )`
          )
        : desc(schema.reviews.createdAt)
    )
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
