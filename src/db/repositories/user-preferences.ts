import { db } from '@/db'
import type { UpdateUserPreferencesParams } from '@/domain/entities/user-preferences'
import { userPreferences } from '../schema'

export async function updateUserPreferences(
  params: UpdateUserPreferencesParams
) {
  return await db.insert(userPreferences).values({
    userId: params.userId,
    watchProviders: params.watchProviders,
  })
}
