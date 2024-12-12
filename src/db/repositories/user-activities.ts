import type {
  DeleteUserActivity,
  InsertUserActivity,
  SelectUserActivities,
} from '@/domain/entities/user-activity'
import { db } from '..'
import { schema } from '../schema'
import { and, eq } from 'drizzle-orm'

export async function insertUserActivity(values: InsertUserActivity) {
  return db.insert(schema.userActivities).values(values)
}

export async function selectUserActivities({ userId }: SelectUserActivities) {
  return db
    .select()
    .from(schema.userActivities)
    .where(eq(schema.userActivities.userId, userId))
}

export async function deleteUserActivity({
  activityType,
  entityId,
  entityType,
  userId,
}: DeleteUserActivity) {
  return db
    .delete(schema.userActivities)
    .where(
      and(
        eq(schema.userActivities.activityType, activityType),
        eq(schema.userActivities.entityId, entityId),
        eq(schema.userActivities.entityType, entityType),
        eq(schema.userActivities.userId, userId)
      )
    )
}
