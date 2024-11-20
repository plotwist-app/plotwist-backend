import { deleteUserEpisode } from '@/db/repositories/user-episode'

export async function deleteUserEpisodeService(id: string) {
  return await deleteUserEpisode(id)
}
