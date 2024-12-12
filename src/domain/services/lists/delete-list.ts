import { deleteList } from '@/db/repositories/list-repository'
import { insertUserActivity } from '@/db/repositories/user-activities'

type DeleteListInput = { id: string; userId: string }

export async function deleteListService({ id }: DeleteListInput) {
  const [deletedList] = await deleteList(id)

  await insertUserActivity({
    activityType: 'DELETE_LIST',
    entityId: deletedList.id,
    entityType: 'LIST',
    userId: deletedList.userId,
  })

  return deletedList
}
