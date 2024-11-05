import { getListById } from '@/db/repositories/list-repository'
import { ListNotFoundError } from '../../errors/list-not-found-error'

type GetListInput = {
  id: string
}

export async function getListService({ id }: GetListInput) {
  const [list] = await getListById(id)

  if (!list) {
    return new ListNotFoundError()
  }

  return { list }
}
