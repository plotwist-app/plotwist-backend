import { deleteFollow } from '@/db/repositories/follows-repository'

export type DeleteFollowServiceInput = {
  followerId: string
  followedId: string
}

export async function deleteFollowService({
  followedId,
  followerId,
}: DeleteFollowServiceInput) {
  return deleteFollow({ followedId, followerId })
}
