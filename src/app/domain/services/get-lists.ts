import { db } from '@/db'
import { schema } from '@/db/schema'
import { and, eq, getTableColumns, sql, desc } from 'drizzle-orm'

type GetListsInput = {
  userId?: string
}

export async function getLists({ userId }: GetListsInput) {
  const lists = await db
    .select({
      ...getTableColumns(schema.lists),
      likes: sql<number>`CAST(count(${schema.listLikes.id}) AS INTEGER)`,
    })
    .from(schema.lists)
    .where(userId ? and(eq(schema.lists.userId, userId)) : undefined)
    .leftJoin(schema.listLikes, eq(schema.lists.id, schema.listLikes.listId))
    .groupBy(schema.lists.id)
    .orderBy(desc(sql`count(${schema.listLikes.id})`))

  return { lists }
}
