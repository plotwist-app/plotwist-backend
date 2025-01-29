import type { UserItemStatus } from '@/@types/item-status-enum'
import type { schema } from '@/db/schema'
import type { getUserItemsQuerySchema } from '@/http/schemas/user-items'
import type { MediaType } from '@plotwist_app/tmdb/dist/utils/with_media_type'
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'

export type UserItem = InferSelectModel<typeof schema.userItems>
export type InsertUserItem = Pick<
  InferInsertModel<typeof schema.userItems>,
  'tmdbId' | 'userId' | 'mediaType' | 'status'
>

export type SelectUserItems = Pick<
  typeof getUserItemsQuerySchema._type,
  'userId' | 'status'
> & {
  cursor?: string
  pageSize: number
}

export type ListAllUserItems = {
  status?: UserItemStatus | 'all'
  userId: string
  mediaType?: MediaType
  position?: number
  orderBy?: string
  orderDirection?: string
}
