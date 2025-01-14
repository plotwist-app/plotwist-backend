import { selectUserPreferences } from '@/db/repositories/user-preferences'

export async function getUserPreferencesService(userId: string) {
  const userPreferences = await selectUserPreferences(userId)

  return userPreferences
}
