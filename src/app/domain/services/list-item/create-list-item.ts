import { insertListItem } from '@/db/repositories/list-item-repository'
import type { InsertListItem } from '../../entities/list-item'
import { getListById } from '@/db/repositories/list-repository'
import { ListNotFoundError } from '../../errors/list-not-found-error'

export async function createListItemService(values: InsertListItem) {
  const [list] = await getListById(values.listId)

  if (!list) {
    return new ListNotFoundError()
  }

  const [listItem] = await insertListItem(values)
  return { listItem }
}
