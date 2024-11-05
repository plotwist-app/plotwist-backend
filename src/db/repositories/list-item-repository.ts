import type { InsertListItem } from '@/app/domain/entities/list-item'
import { db } from '..'
import { schema } from '../schema'

export async function insertListItem(input: InsertListItem) {
  return db.insert(schema.listItems).values(input).returning()
}
