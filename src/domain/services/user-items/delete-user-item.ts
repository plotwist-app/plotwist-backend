import { deleteUserItem } from '@/db/repositories/user-item-repository'
import { UserItemNotFoundError } from '@/domain/errors/user-item-not-found-error'

export async function deleteUserItemService(id: string) {
  const [deletedUserItem] = await deleteUserItem(id)

  if (!deletedUserItem) {
    return new UserItemNotFoundError()
  }

  return { deletedUserItem }
}
