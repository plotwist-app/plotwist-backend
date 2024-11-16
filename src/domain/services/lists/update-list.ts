import { getList, updateList } from '@/db/repositories/list-repository'
import type { schema } from '@/db/schema'
import type { InferInsertModel } from 'drizzle-orm'
import { ListNotFoundError } from '../../errors/list-not-found-error'

export type UpdateListValues = Omit<
  InferInsertModel<typeof schema.lists>,
  'userId' | 'createdAt' | 'coverPath'
>

type UpdateListInput = {
  id: string
  userId: string
  values: UpdateListValues
}

export async function updateListService({
  id,
  userId,
  values,
}: UpdateListInput) {
  const [list] = await getList(id, userId)

  if (!list) {
    return new ListNotFoundError()
  }

  const [updatedList] = await updateList(id, userId, values)
  return { list: updatedList }
}
