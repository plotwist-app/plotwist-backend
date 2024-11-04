import { selectLists } from '@/db/repositories/list-repository'

export type GetListsInput = {
  userId?: string
  limit?: number
  authenticatedUserId?: string
}

export async function getLists(input: GetListsInput) {
  const lists = selectLists(input)

  return { lists }
}
