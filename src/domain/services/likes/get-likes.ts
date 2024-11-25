import { selectLikes } from '@/db/repositories/likes-repository'

export async function getLikesService(entityId: string) {
  const likes = await selectLikes(entityId)

  return { likes }
}
