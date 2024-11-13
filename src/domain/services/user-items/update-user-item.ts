import { updateUserItemStatus } from '@/db/repositories/user-item-repository'

export type UpdateUserItemStatusInput = {
  id: string
  status: 'WATCHING' | 'WATCHED' | 'WATCHLIST'
}

export async function updateUserItemStatusService(
  input: UpdateUserItemStatusInput
) {
  const [userItem] = await updateUserItemStatus(input)

  return { userItem }
}
