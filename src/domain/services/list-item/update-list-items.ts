import { updateListItems } from '@/db/repositories/list-item-repository'

export type UpdateListItemsServiceInput = {
  listItems: Array<{ id: string; position: number }>
}

export async function updateListItemsService(
  input: UpdateListItemsServiceInput
) {
  const result = await updateListItems(input)
  const listItems = result.flat()

  console.log({ listItems })

  return { listItems }
}
