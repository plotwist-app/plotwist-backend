import { updateUserPreferences } from '@/db/repositories/user-preferences'
import type { UpdateUserPreferencesParams } from '@/domain/entities/user-preferences'

export async function updateUserPreferencesService({
  userId,
  watchProviders,
}: UpdateUserPreferencesParams) {
  const userPreferences = await updateUserPreferences({
    userId,
    watchProviders,
  })

  return { userPreferences }
}
