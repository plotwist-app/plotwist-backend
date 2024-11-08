import {
  deleteListItem,
  getListItem,
} from '@/db/repositories/list-item-repository'
import { getListById } from '@/db/repositories/list-repository'
import { ListItemNotFoundError } from '@/domain/errors/list-item-not-found-error'
import { ListNotFoundError } from '@/domain/errors/list-not-found-error'
import { UnauthorizedError } from '@/domain/errors/unauthorized-error'

type DeleteListItemInput = { id: string; authenticatedUserId: string }

export async function deleteListItemService({
  id,
  authenticatedUserId,
}: DeleteListItemInput) {
  const [listItem] = await getListItem(id)
  if (!listItem) {
    return new ListItemNotFoundError()
  }

  const [list] = await getListById(listItem.listId)
  if (!list) {
    return new ListNotFoundError()
  }

  const isOwner = authenticatedUserId === list.userId
  if (!isOwner) {
    return new UnauthorizedError()
  }

  return await deleteListItem(id)
}
