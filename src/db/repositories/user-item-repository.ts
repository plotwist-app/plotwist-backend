import type { InsertUserItem } from '@/domain/entities/user-item'
import { db } from '..'
import { schema } from '../schema'
import type { GetUserItemsInput } from '@/domain/services/user-items/get-user-items'
import { and, desc, eq } from 'drizzle-orm'

export async function insertUserItem(values: InsertUserItem) {
  return db.insert(schema.userItems).values(values).returning()
}

export async function selectUserItems({ userId, status }: GetUserItemsInput) {
  return db
    .select()
    .from(schema.userItems)
    .where(
      and(
        eq(schema.userItems.userId, userId),
        eq(schema.userItems.status, status)
      )
    )
    .orderBy(desc(schema.userItems.addedAt))
    .limit(20)
}

export async function deleteUserItem(id: string) {
  return db
    .delete(schema.userItems)
    .where(eq(schema.userItems.id, id))
    .returning()
}
