import type { schema } from '@/db/schema'
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'

export type UserItem = InferSelectModel<typeof schema.userItems>
export type InsertUserItem = Pick<
  InferInsertModel<typeof schema.userItems>,
  'tmdbId' | 'userId' | 'mediaType' | 'status'
>
