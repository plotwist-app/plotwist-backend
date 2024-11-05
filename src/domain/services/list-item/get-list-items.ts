import { db } from '@/db'
import { getListById } from '@/db/repositories/list-repository'
import { schema } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { ListNotFoundError } from '../../errors/list-not-found-error'
import { selectListItems } from '@/db/repositories/list-item-repository'

type GetListItemsInput = { listId: string }

export async function getListItemsService({ listId }: GetListItemsInput) {
  const [list] = await getListById(listId)

  if (!list) {
    return new ListNotFoundError()
  }

  const listItems = await selectListItems(listId)

  return { listItems }
}
