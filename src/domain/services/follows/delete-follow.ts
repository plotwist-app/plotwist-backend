import { deleteFollow } from '@/db/repositories/followers-repository'
import { deleteFollowUserActivity } from '@/db/repositories/user-activities'

export type DeleteFollowServiceInput = {
  followerId: string
  followedId: string
}

export async function deleteFollowService({
  followedId,
  followerId,
}: DeleteFollowServiceInput) {
  const [deletedFollow] = await deleteFollow({ followedId, followerId })

  await deleteFollowUserActivity({
    userId: deletedFollow.followerId,
    followedId: deletedFollow.followedId,
    followerId: deletedFollow.followerId,
  })

  return { follow: deletedFollow }
}
