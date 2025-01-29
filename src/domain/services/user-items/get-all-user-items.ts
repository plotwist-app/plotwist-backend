import { selectAllUserItemsByStatus } from '@/db/repositories/user-item-repository'
import type { ListAllUserItems } from '@/domain/entities/user-item'

export async function getAllUserItemsService(input: ListAllUserItems) {
  const userItems = await selectAllUserItemsByStatus(input)

  return { userItems: userItems }
}
