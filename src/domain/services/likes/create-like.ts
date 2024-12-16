import { insertLike } from '@/db/repositories/likes-repository'
import { insertUserActivity } from '@/db/repositories/user-activities'
import type { InsertLike } from '@/domain/entities/likes'
import type { InsertUserActivity } from '@/domain/entities/user-activity'

export const likeAcvityType: Record<
  InsertLike['entityType'],
  InsertUserActivity['activityType']
> = {
  LIST: 'LIKE_LIST',
  REPLY: 'LIKE_REPLY',
  REVIEW: 'LIKE_REVIEW',
}

export async function createLikeService(values: InsertLike) {
  const [like] = await insertLike(values)

  await insertUserActivity({
    activityType: likeAcvityType[like.entityType],
    entityType: like.entityType,
    entityId: like.entityId,
    userId: like.userId,
  })

  return { like }
}
