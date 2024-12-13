import { deleteListItem } from '@/db/repositories/list-item-repository'
import { insertUserActivity } from '@/db/repositories/user-activities'
import { ListItemNotFoundError } from '@/domain/errors/list-item-not-found-error'

type DeleteListItemInput = { id: string; userId: string }

export async function deleteListItemService({
  id,
  userId,
}: DeleteListItemInput) {
  const [deletedListItem] = await deleteListItem(id)

  if (!deletedListItem) {
    return new ListItemNotFoundError()
  }

  await insertUserActivity({
    activityType: 'DELETE_ITEM',
    userId,
    entityId: deletedListItem.listId,
    entityType: 'LIST',
    metadata: JSON.stringify({
      tmdbId: deletedListItem.tmdbId,
      mediaType: deletedListItem.mediaType,
    }),
  })

  return { deletedListItem }
}
