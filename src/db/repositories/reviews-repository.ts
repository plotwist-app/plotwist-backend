import type { CreateReviewInterface } from '@/app/domain/services/reviews/create-review'
import { db } from '@/db'
import { schema } from '@/db/schema'

export async function insertReview(params: CreateReviewInterface) {
  return db.insert(schema.reviews).values(params).returning()
}
