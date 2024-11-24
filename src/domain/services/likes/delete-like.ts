import { deleteLike } from '@/db/repositories/likes-repository'

export async function deleteLikeService(id: string) {
  return await deleteLike(id)
}
