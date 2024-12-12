import type { schema } from '@/db/schema'
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'

type NonNullableRequired<T> = {
  [K in keyof T]-?: NonNullable<T[K]>
}

export type UserActvity = InferSelectModel<typeof schema.userActivities>
export type InsertUserActivity = InferInsertModel<typeof schema.userActivities>
export type SelectUserActivities = Pick<UserActvity, 'userId'>
export type DeleteUserActivity = NonNullableRequired<
  Pick<
    InsertUserActivity,
    'activityType' | 'entityId' | 'entityType' | 'userId'
  >
>
