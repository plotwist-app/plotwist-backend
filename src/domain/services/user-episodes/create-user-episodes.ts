import { insertUserActivity } from '@/db/repositories/user-activities'
import { insertUserEpisodes } from '@/db/repositories/user-episode'
import type { InsertUserEpisode } from '@/domain/entities/user-episode'

export async function createUserEpisodesService(
  values: InsertUserEpisode[],
  insertActivity = true
) {
  const userEpisodes = await insertUserEpisodes(values)

  if (insertActivity) {
    await insertUserActivity({
      activityType: 'WATCH_EPISODE',
      userId: values[0].userId,
      metadata: values,
    })
  }

  return { userEpisodes }
}
