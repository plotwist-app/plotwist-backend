import { deleteLike } from '@/db/repositories/likes-repository'
import { deleteUserActivity } from '@/db/repositories/user-activities'
import { likeAcvityType } from './create-like'

export async function deleteLikeService(id: string) {
  const [like] = await deleteLike(id)

  await deleteUserActivity({
    activityType: likeAcvityType[like.entityType],
    entityType: like.entityType,
    entityId: like.entityId,
    userId: like.userId,
  })

  return { like }
}
