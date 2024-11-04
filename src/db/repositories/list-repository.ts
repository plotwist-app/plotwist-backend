import type { GetListsInput } from '@/app/domain/services/get-lists'
import { db } from '..'
import { and, desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { schema } from '../schema'

export function selectLists({
  userId,
  limit = 5,
  authenticatedUserId,
}: GetListsInput) {
  return db
    .select({
      ...getTableColumns(schema.lists),
      user: {
        id: schema.users.id,
        username: schema.users.username,
        imagePath: schema.users.imagePath,
      },

      likeCount:
        sql`(SELECT COUNT(*)::int FROM ${schema.listLikes} WHERE ${schema.listLikes.listId} = ${schema.lists.id})`.as(
          'likeCount'
        ),

      hasLiked: authenticatedUserId
        ? sql`EXISTS (
              SELECT 1 FROM ${schema.listLikes} 
              WHERE ${schema.listLikes.listId} = ${schema.lists.id} 
              AND ${schema.listLikes.userId} = ${authenticatedUserId}
            )`.as('hasLiked')
        : sql`false`.as('hasLiked'),

      items: sql`COALESCE(ARRAY(
        SELECT jsonb_build_object(
            'id', ${schema.listItems.id},
            'tmdbId', ${schema.listItems.tmdbId},
            'mediaType', ${schema.listItems.mediaType}
        ) FROM ${schema.listItems}
        WHERE ${schema.listItems.listId} = ${schema.lists.id}
    ), NULL)`.as('items'),
    })
    .from(schema.lists)
    .where(userId ? and(eq(schema.lists.userId, userId)) : undefined)
    .leftJoin(schema.users, eq(schema.lists.userId, schema.users.id))
    .leftJoin(schema.listItems, eq(schema.listItems.listId, schema.lists.id))
    .groupBy(
      schema.lists.id,
      schema.users.id,
      schema.listItems.id,
      schema.listItems.listId
    )
    .orderBy(
      desc(
        sql`(SELECT COUNT(*)::int FROM ${schema.listLikes} WHERE ${schema.listLikes.listId} = ${schema.lists.id})`
      )
    )
    .limit(limit)
}
