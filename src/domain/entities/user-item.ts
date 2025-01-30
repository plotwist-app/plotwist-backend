import type { UserItemStatus } from '@/@types/item-status-enum'
import type { schema } from '@/db/schema'
import type { getAllUserItemsQuerySchema } from '@/http/schemas/user-items'
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'

export type UserItem = InferSelectModel<typeof schema.userItems>
export type InsertUserItem = Pick<
  InferInsertModel<typeof schema.userItems>,
  'tmdbId' | 'userId' | 'mediaType' | 'status'
>

export type SelectUserItems = {
  userId: string
  status: UserItemStatus
  rating?: number
  mediaType?: 'TV_SHOW' | 'MOVIE'
  cursor?: string
  pageSize: number
  orderBy: 'addedAt' | 'updatedAt'
  orderDirection: 'asc' | 'desc'
}

export type SelectAllUserItems = typeof getAllUserItemsQuerySchema._type
