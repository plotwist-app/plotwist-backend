import { selectUserItems } from '@/db/repositories/user-item-repository'
import type { SelectUserItems } from '@/domain/entities/user-item'

export async function getUserItemsService(input: SelectUserItems) {
  const userItems = await selectUserItems({ ...input, rating: 5 })

  console.log(userItems)

  const lastUserItem = userItems[input.pageSize]
  const nextCursor = lastUserItem?.updatedAt.toISOString() || null

  const slicedUserItems = userItems.slice(0, input.pageSize)

  return { userItems: slicedUserItems, nextCursor }
}
