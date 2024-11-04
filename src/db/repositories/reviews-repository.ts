import type { InsertReviewModel } from '@/app/domain/entities/review'
import { db } from '@/db'
import { schema } from '@/db/schema'

export async function insertReview(params: InsertReviewModel) {
  return db.insert(schema.reviews).values(params).returning()
}
