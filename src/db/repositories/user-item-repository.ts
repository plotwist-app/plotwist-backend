import type { InsertUserItem } from '@/domain/entities/user-item'
import type { GetUserItemInput } from '@/domain/services/user-items/get-user-item'
import type { GetUserItemsInput } from '@/domain/services/user-items/get-user-items'
import type { UpdateUserItemStatusInput } from '@/domain/services/user-items/update-user-item'
import { and, desc, eq } from 'drizzle-orm'
import { db } from '..'
import { schema } from '../schema'

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
}

export async function deleteUserItem(id: string) {
  return db
    .delete(schema.userItems)
    .where(eq(schema.userItems.id, id))
    .returning()
}

export async function selectUserItem({
  userId,
  mediaType,
  tmdbId,
}: GetUserItemInput) {
  return db
    .select()
    .from(schema.userItems)
    .where(
      and(
        eq(schema.userItems.userId, userId),
        eq(schema.userItems.mediaType, mediaType),
        eq(schema.userItems.tmdbId, tmdbId)
      )
    )
    .limit(1)
}

export async function updateUserItemStatus({
  id,
  status,
}: UpdateUserItemStatusInput) {
  return db
    .update(schema.userItems)
    .set({ status })
    .where(eq(schema.userItems.id, id))
    .returning()
}
