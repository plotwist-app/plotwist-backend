import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import type { schema } from '@/db/schema'

export type ReviewReply = InferSelectModel<typeof schema.reviewReplies>

export type InsertReviewReplyModel = InferInsertModel<
  typeof schema.reviewReplies
>
export type DeleteReviewReplyModel = Pick<
  InferSelectModel<typeof schema.reviewReplies>,
  'id' | 'userId' | 'reviewId'
>

export type UpdateReviewReplyModel = Pick<
  InferSelectModel<typeof schema.reviewReplies>,
  'id' | 'reply' | 'reviewId' | 'userId'
>

export type FetchReviewRepliesModel = Pick<
  InferSelectModel<typeof schema.reviewReplies>,
  'reviewId'
> & {
  page: number
}
