import { updateUserSubscription } from '@/db/repositories/user-repository'
import { UserNotFoundError } from '@/domain/errors/user-not-found'

type UpdateUserSubscriptionInput = {
  userId: string
  subscriptionType: 'PRO' | 'MEMBER'
}

export async function updateUserSubscriptionService({
  userId,
  subscriptionType,
}: UpdateUserSubscriptionInput) {
  const [user] = await updateUserSubscription(userId, subscriptionType)

  if (!user) {
    return new UserNotFoundError()
  }

  return { user }
}
