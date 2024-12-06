import { getFollow } from '@/db/repositories/follows-repository'

export type GetFollowServiceInput = {
  followerId: string
  followedId: string
}

export async function getFollowService({
  followedId,
  followerId,
}: GetFollowServiceInput) {
  const [follow] = await getFollow({ followedId, followerId })
  return { follow: follow || null }
}
