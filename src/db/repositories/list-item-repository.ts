import type { InsertListItem } from '@/domain/entities/list-item'
import { eq } from 'drizzle-orm'
import { db } from '..'
import { schema } from '../schema'

export async function insertListItem(input: InsertListItem) {
  return db.insert(schema.listItems).values(input).returning()
}

export async function selectListItems(listId: string) {
  return db
    .select()
    .from(schema.listItems)
    .where(eq(schema.listItems.listId, listId))
}

export async function deleteListItem(id: string) {
  return db.delete(schema.listItems).where(eq(schema.listItems.id, id))
}

export async function getListItem(id: string) {
  return db
    .select()
    .from(schema.listItems)
    .where(eq(schema.listItems.id, id))
    .orderBy(schema.listItems.position)
}
