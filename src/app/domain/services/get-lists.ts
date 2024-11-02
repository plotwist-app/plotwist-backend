import { db } from '@/db'
import { schema } from '@/db/schema'
import { and, eq, getTableColumns, sql, desc } from 'drizzle-orm'

type GetListsInput = {
  userId?: string
  limit?: number
}

export async function getLists({ userId, limit = 5 }: GetListsInput) {
  const lists = await db
    .select({
      ...getTableColumns(schema.lists),
      user: {
        id: schema.users.id,
        username: schema.users.username,
        imagePath: schema.users.imagePath,
      },
      likes: sql<Array<{ id: string; username: string; imagePath: string }>>`
        ARRAY(
          SELECT json_build_object(
            'id', ${schema.users.id},
            'username', ${schema.users.username},
            'imagePath', ${schema.users.imagePath}
          )
          FROM ${schema.users}
          WHERE ${schema.users.id} IN (
            SELECT ${schema.listLikes.userId}
            FROM ${schema.listLikes}
            WHERE ${schema.listLikes.listId} = ${schema.lists.id}
          )
        )`,
    })
    .from(schema.lists)
    .where(userId ? and(eq(schema.lists.userId, userId)) : undefined)
    .leftJoin(schema.listLikes, eq(schema.lists.id, schema.listLikes.listId))
    .leftJoin(schema.users, eq(schema.lists.userId, schema.users.id))
    .groupBy(schema.lists.id, schema.users.id)
    .orderBy(desc(sql`count(${schema.listLikes.id})`))
    .limit(limit)

  return { lists }
}
