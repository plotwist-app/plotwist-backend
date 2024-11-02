import { db } from '@/db'
import { schema } from '@/db/schema'
import { and, eq, getTableColumns, sql, desc } from 'drizzle-orm'

type GetListsInput = {
  userId?: string
  limit?: number
  authenticatedUserId?: string
}

export async function getLists({
  userId,
  limit = 5,
  authenticatedUserId,
}: GetListsInput) {
  const lists = await db
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
    })
    .from(schema.lists)
    .where(userId ? and(eq(schema.lists.userId, userId)) : undefined)
    .leftJoin(schema.users, eq(schema.lists.userId, schema.users.id))
    .groupBy(schema.lists.id, schema.users.id)
    .orderBy(
      desc(
        sql`(SELECT COUNT(*)::int FROM ${schema.listLikes} WHERE ${schema.listLikes.listId} = ${schema.lists.id})`
      )
    )
    .limit(limit)

  return { lists }
}
