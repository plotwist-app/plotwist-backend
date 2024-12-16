import { selectUserItems } from '@/db/repositories/user-item-repository'
import type { UserItemStatus } from '@/domain/value-objects/import-item-status-enum'

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
