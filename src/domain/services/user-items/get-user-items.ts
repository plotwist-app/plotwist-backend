import { selectUserItems } from '@/db/repositories/user-item-repository'
import type { UserItemStatus } from '@/domain/value_objects/import_item_status_enum'

export type GetUserItemsInput = {
  userId: string
  status: UserItemStatus
}

export async function getUserItemsService({
  userId,
  status,
}: GetUserItemsInput) {
  const userItems = await selectUserItems({ userId, status })

  return { userItems }
}
