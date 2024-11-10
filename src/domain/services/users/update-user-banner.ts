import { updateUserBanner } from '@/db/repositories/user-repository'
import { UserNotFoundError } from '@/domain/errors/user-not-found'

type UpdateUserBannerInput = {
  userId: string
  bannerPath: string
}

export async function updateUserBannerService({
  userId,
  bannerPath,
}: UpdateUserBannerInput) {
  const [user] = await updateUserBanner(userId, bannerPath)

  if (!user) {
    return new UserNotFoundError()
  }

  return { user }
}
