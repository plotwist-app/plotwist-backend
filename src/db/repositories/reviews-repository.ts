import type { InsertReviewModel } from '@/domain/entities/review'
import { db } from '@/db'
import { schema } from '@/db/schema'
import type { GetReviewsServiceInput } from '@/domain/services/reviews/get-reviews'
import { and, eq, getTableColumns } from 'drizzle-orm'

export async function insertReview(params: InsertReviewModel) {
  return db.insert(schema.reviews).values(params).returning()
}

export async function selectReviews({
  mediaType,
  tmdbId,
}: GetReviewsServiceInput) {
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
    .where(
      and(
        eq(schema.reviews.mediaType, mediaType),
        eq(schema.reviews.tmdbId, tmdbId)
      )
    )
    .leftJoin(schema.users, eq(schema.reviews.userId, schema.users.id))
}
