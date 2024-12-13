import type {
  DeleteUserActivity,
  InsertUserActivity,
} from '@/domain/entities/user-activity'
import { db } from '..'
import { schema } from '../schema'
import { and, desc, eq, getTableColumns, sql } from 'drizzle-orm'

export async function insertUserActivity(values: InsertUserActivity) {
  return db.insert(schema.userActivities).values(values)
}

export async function selectUserActivities({ userId }: { userId: string }) {
  return db
    .select({
      ...getTableColumns(schema.userActivities),
      additionalInfo: sql`
        CASE
          WHEN ${schema.userActivities.activityType} IN ('FOLLOW_USER', 'UNFOLLOW_USER') THEN json_build_object(
            'id', ${schema.users.id},
            'username', ${schema.users.username},
            'avatarUrl', ${schema.users.avatarUrl}
          )

          WHEN ${schema.userActivities.activityType} IN ('CREATE_LIST', 'LIKE_LIST') THEN json_build_object(
            'id', ${schema.lists.id},
            'title', ${schema.lists.title}
          )

          WHEN ${schema.userActivities.activityType} IN ('LIKE_REVIEW', 'CREATE_REVIEW') THEN json_build_object(
            'id', ${schema.reviews.id},
            'review', ${schema.reviews.review},
            'rating', ${schema.reviews.rating},
            'tmdbId', ${schema.reviews.tmdbId},
            'mediaType', ${schema.reviews.mediaType},
          )

          WHEN ${schema.userActivities.activityType} IN ('LIKE_REPLY', 'CREATE_REPLY') THEN json_build_object(
            'id', ${schema.reviewReplies.id},
            'reply', ${schema.reviewReplies.reply}
          )

          WHEN ${schema.userActivities.activityType} IN ('ADD_ITEM', 'DELETE_ITEM') THEN json_build_object(
            'tmdbId', ${sql`(metadata::jsonb->>'tmdbId')::integer`},
            'mediaType', ${sql`(metadata::jsonb->>'mediaType')`},
            'listId', ${schema.lists.id},
            'listTitle', ${schema.lists.title}
          )

          WHEN ${schema.userActivities.activityType} IN ('WATCH_EPISODE') THEN json_build_object(
            'episodes', ${sql`(metadata::jsonb)`}
          )

          WHEN ${schema.userActivities.activityType} IN ('CHANGE_STATUS') THEN json_build_object(
            'tmdbId', ${sql`(metadata::jsonb->>'tmdbId')::integer`},
            'mediaType', ${sql`(metadata::jsonb->>'mediaType')`},
            'status', ${sql`(metadata::jsonb->>'status')`}
          )

          ELSE NULL
        END
      `.as('additionalInfo'),
    })
    .from(schema.userActivities)
    .where(eq(schema.userActivities.userId, userId))
    .orderBy(desc(schema.userActivities.createdAt))
    .leftJoin(
      schema.users,
      sql`(${schema.userActivities.activityType} = 'FOLLOW_USER' OR ${schema.userActivities.activityType} = 'UNFOLLOW_USER') 
      AND ${sql`(metadata::jsonb->>'followedId')`} = ${schema.users.id}::text`
    )
    .leftJoin(
      schema.lists,
      sql`(
        ${schema.userActivities.activityType} = 'CREATE_LIST' 
        OR ${schema.userActivities.activityType} = 'LIKE_LIST'
        OR ${schema.userActivities.activityType} = 'ADD_ITEM'
        OR ${schema.userActivities.activityType} = 'DELETE_ITEM')
        AND ${schema.userActivities.entityId} = ${schema.lists.id}`
    )
    .leftJoin(
      schema.reviews,
      sql`(
        ${schema.userActivities.activityType} = 'LIKE_REVIEW'
        OR ${schema.userActivities.activityType} = 'CREATE_REVIEW')
        AND ${schema.userActivities.entityId} = ${schema.reviews.id}`
    )
    .leftJoin(
      schema.reviewReplies,
      sql`(
        ${schema.userActivities.activityType} = 'LIKE_REPLY'
        OR ${schema.userActivities.activityType} = 'CREATE_REPLY')
        AND ${schema.userActivities.entityId} = ${schema.reviewReplies.id}`
    )
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
