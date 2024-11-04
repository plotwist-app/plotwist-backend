import { deleteList, getList } from '@/db/repositories/list-repository'
import { UnauthorizedError } from '../../errors/unauthorized-error'
import { ListNotFoundError } from '../../errors/list-not-found-error'

type DeleteListInput = { id: string; userId: string }

export async function deleteListService({ id, userId }: DeleteListInput) {
  const [list] = await getList(id, userId)

  if (!list) {
    return new ListNotFoundError()
  }

  const isOwner = userId === list.userId
  if (!isOwner) {
    return new UnauthorizedError()
  }

  return await deleteList(id)
}
