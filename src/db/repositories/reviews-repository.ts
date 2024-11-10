import type {
  DeleteReviewReplyModel,
  InsertReviewModel,
  InsertReviewReplyModel,
} from '@/domain/entities/review'
import { db } from '@/db'
import { schema } from '@/db/schema'
import { and, eq } from 'drizzle-orm'

export async function insertReview(params: InsertReviewModel) {
  return db.insert(schema.reviews).values(params).returning()
}

export async function insertReviewReply(params: InsertReviewReplyModel) {
  return db.insert(schema.reviewReplies).values(params).returning()
}

export async function getReviewById(id: string) {
  return db.select().from(schema.reviews).where(eq(schema.reviews.id, id))
}

export async function deleteReviewReply(params: DeleteReviewReplyModel) {
  return db
    .delete(schema.reviewReplies)
    .where(
      and(
        eq(schema.reviewReplies.id, params.id),
        eq(schema.reviewReplies.userId, params.userId)
      )
    )
    .returning()
}
