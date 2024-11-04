import { deleteList, getList } from '@/db/repositories/list-repository'
import { ListNotFoundError } from '../../errors/list-not-found-error'

type DeleteListInput = { id: string; userId: string }

export async function deleteListService({ id, userId }: DeleteListInput) {
  const [list] = await getList(id, userId)

  if (!list) {
    return new ListNotFoundError()
  }

  return await deleteList(id)
}
