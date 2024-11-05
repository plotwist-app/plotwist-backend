import { selectLists } from '@/db/repositories/list-repository'

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
  const lists = await selectLists({ authenticatedUserId, limit, userId })
  return { lists }
}
