import { selectAllUserItems } from '@/db/repositories/user-item-repository'
import type { SelectAllUserItems } from '@/domain/entities/user-item'

export async function getAllUserItemsService(input: SelectAllUserItems) {
  const userItems = await selectAllUserItems(input)

  return { userItems: userItems }
}
