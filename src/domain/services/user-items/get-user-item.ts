import { selectUserItem } from '@/db/repositories/user-item-repository'
import { UserItemNotFoundError } from '@/domain/errors/user-item-not-found-error'

export type GetUserItemInput = {
  tmdbId: number
  mediaType: 'TV_SHOW' | 'MOVIE'
  userId: string
}

export async function getUserItemService(input: GetUserItemInput) {
  const [userItem] = await selectUserItem(input)

  return { userItem }
}
