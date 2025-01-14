import { db } from '@/db'
import type { UpdateUserPreferencesParams } from '@/domain/entities/user-preferences'
import { userPreferences } from '../schema'
import { eq } from 'drizzle-orm'

export async function updateUserPreferences(
  params: UpdateUserPreferencesParams
) {
  return await db
    .insert(userPreferences)
    .values({
      userId: params.userId,
      watchProviders: params.watchProviders,
    })
    .onConflictDoUpdate({
      target: [userPreferences.userId],
      set: {
        watchProviders: params.watchProviders,
      },
    })
    .returning()
}

export async function selectUserPreferences(userId: string) {
  return await db
    .select()
    .from(userPreferences)
    .where(eq(userPreferences.userId, userId))
}
