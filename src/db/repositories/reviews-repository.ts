import type { InsertReviewModel } from '@/domain/entities/review'
import { db } from '@/db'
import { schema } from '@/db/schema'
import type { GetReviewsServiceInput } from '@/domain/services/reviews/get-reviews'
import { and, eq } from 'drizzle-orm'

export async function insertReview(params: InsertReviewModel) {
  return db.insert(schema.reviews).values(params).returning()
}

export async function selectReviews({
  mediaType,
  tmdbId,
}: GetReviewsServiceInput) {
  return db
    .select()
    .from(schema.reviews)
    .where(
      and(
        eq(schema.reviews.mediaType, mediaType),
        eq(schema.reviews.tmdbId, tmdbId)
      )
    )
}
