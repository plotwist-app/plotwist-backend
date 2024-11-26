import { deleteList } from '@/db/repositories/list-repository'

type DeleteListInput = { id: string; userId: string }

export async function deleteListService({ id }: DeleteListInput) {
  return await deleteList(id)
}
