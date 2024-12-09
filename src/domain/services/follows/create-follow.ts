import { insertFollow } from '@/db/repositories/followers-repository'

export type CreateFollowServiceInput = {
  followerId: string
  followedId: string
}

export async function createFollowService({
  followedId,
  followerId,
}: CreateFollowServiceInput) {
  const [follow] = await insertFollow({ followedId, followerId })

  return { follow }
}
