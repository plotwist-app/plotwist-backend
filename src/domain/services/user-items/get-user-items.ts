import { selectUserItems } from '@/db/repositories/user-item-repository'

export type GetUserItemsInput = {
  userId: string
  status: 'WATCHED' | 'WATCHLIST' | 'WATCHING' | 'DROPPED'
}

export async function getUserItemsService({
  userId,
  status,
}: GetUserItemsInput) {
  const userItems = await selectUserItems({ userId, status })

  return { userItems }
}
