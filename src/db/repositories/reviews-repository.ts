import type {
  InsertReviewModel,
  InsertReviewReplyModel,
} from '@/domain/entities/review'
import { db } from '@/db'
import { schema } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function insertReview(params: InsertReviewModel) {
  return db.insert(schema.reviews).values(params).returning()
}

export async function insertReviewReply(params: InsertReviewReplyModel) {
  return db.insert(schema.reviewReplies).values(params).returning()
}
