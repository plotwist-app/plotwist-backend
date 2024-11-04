import { selectLists } from '@/db/repositories/list-repository'
import { getUserById } from '@/db/repositories/user-repository'
import { UserNotFound } from '../errors/user-not-found'

export type GetListsInput = {
  userId?: string
  limit?: number
  authenticatedUserId?: string
}

export async function getLists({
  authenticatedUserId,
  limit,
  userId,
}: GetListsInput) {
  if (userId) {
    const [user] = await getUserById(userId)

    if (!user) {
      return new UserNotFound()
    }
  }

  const lists = await selectLists({ authenticatedUserId, limit, userId })
  return { lists }
}
