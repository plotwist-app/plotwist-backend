import type { InsertListItem } from '@/app/domain/entities/list-item'
import { db } from '..'
import { schema } from '../schema'
import { eq } from 'drizzle-orm'

export async function insertListItem(input: InsertListItem) {
  return db.insert(schema.listItems).values(input).returning()
}

export async function selectListItems(listId: string) {
  return db
    .select()
    .from(schema.listItems)
    .where(eq(schema.listItems.listId, listId))
}
