import { deleteFollow } from '@/db/repositories/followers-repository'
import { insertUserActivity } from '@/db/repositories/user-activities'

export type DeleteFollowServiceInput = {
  followerId: string
  followedId: string
}

export async function deleteFollowService({
  followedId,
  followerId,
}: DeleteFollowServiceInput) {
  const [deletedFollow] = await deleteFollow({ followedId, followerId })

  await insertUserActivity({
    activityType: 'UNFOLLOW_USER',
    userId: deletedFollow.followerId,
    metadata: JSON.stringify(deletedFollow),
  })

  return { follow: deletedFollow }
}
