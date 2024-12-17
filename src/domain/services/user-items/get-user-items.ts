import { selectUserItems } from '@/db/repositories/user-item-repository'
import type { getUserItemsQuerySchema } from '@/http/schemas/user-items'

export type GetUserItemsInput = Omit<
  typeof getUserItemsQuerySchema._type,
  'language'
>

export async function getUserItemsService({
  userId,
  status,
}: GetUserItemsInput) {
  const userItems = await selectUserItems({ userId, status })

  return { userItems }
}
