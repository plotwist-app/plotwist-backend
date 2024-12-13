import { insertUserActivity } from '@/db/repositories/user-activities'
import { insertUserEpisodes } from '@/db/repositories/user-episode'
import type { InsertUserEpisode } from '@/domain/entities/user-episode'

export async function createUserEpisodesService(values: InsertUserEpisode[]) {
  const userEpisodes = await insertUserEpisodes(values)

  await insertUserActivity({
    activityType: 'WATCH_EPISODE',
    userId: values[0].userId,
    metadata: JSON.stringify(values),
  })

  return { userEpisodes }
}
