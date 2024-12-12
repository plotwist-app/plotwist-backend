import { updateListItems } from '@/db/repositories/list-item-repository'

export type UpdateListItemsServiceInput = {
  listItems: Array<{ id: string; position: number }>
}

export async function updateListItemsService(
  input: UpdateListItemsServiceInput
) {
  const [listItem] = await updateListItems(input)

  return { listItem }
}
