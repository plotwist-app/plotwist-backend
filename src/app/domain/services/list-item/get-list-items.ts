import { db } from '@/db'
import { schema } from '@/db/schema'
import { eq } from 'drizzle-orm'

type GetListItemsInput = { listId: string }

export async function getListItemsService({ listId }: GetListItemsInput) {
  const listItems = await db
    .select()
    .from(schema.listItems)
    .where(eq(schema.listItems.listId, listId))

  return { listItems }
}
