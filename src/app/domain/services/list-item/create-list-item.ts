import { insertListItem } from '@/db/repositories/list-item-repository'
import type { InsertListItem } from '../../entities/list-item'

export async function createListItemService(values: InsertListItem) {
  const [listItem] = await insertListItem(values)

  return { listItem }
}
