import { updateUserImage } from '@/db/repositories/user-repository'
import { UserNotFoundError } from '@/domain/errors/user-not-found'

type UpdateUserImageInput = {
  userId: string
  imagePath: string
}

export async function updateUserImageService({
  imagePath,
  userId,
}: UpdateUserImageInput) {
  const [user] = await updateUserImage(userId, imagePath)

  if (!user) {
    return new UserNotFoundError()
  }

  return { user }
}
