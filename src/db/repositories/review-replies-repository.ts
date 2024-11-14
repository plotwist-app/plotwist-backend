import { db } from '@/db'
import { schema } from '@/db/schema'
import type {
  DeleteReviewReplyModel,
  InsertReviewReplyModel,
  UpdateReviewReplyModel,
  FetchReviewRepliesModel,
} from '@/domain/entities/review-reply'
import { and, eq } from 'drizzle-orm'

export async function insertReviewReply(params: InsertReviewReplyModel) {
  return db.insert(schema.reviewReplies).values(params).returning()
}

export async function deleteReviewReply(params: DeleteReviewReplyModel) {
  return db
    .delete(schema.reviewReplies)
    .where(and(eq(schema.reviewReplies.id, params.id)))
    .returning()
}

export async function getReviewReplyById(id: string) {
  return db
    .select()
    .from(schema.reviewReplies)
    .where(eq(schema.reviewReplies.id, id))
}

export async function updateReviewReply(params: UpdateReviewReplyModel) {
  return db
    .update(schema.reviewReplies)
    .set(params)
    .where(and(eq(schema.reviewReplies.id, params.id)))
    .returning()
}

export async function getReviewReplies(params: FetchReviewRepliesModel) {
  return db
    .select()
    .from(schema.reviewReplies)
    .where(eq(schema.reviewReplies.reviewId, params.reviewId))
    .limit(10)
    .offset((params.page - 1) * 10)
}
