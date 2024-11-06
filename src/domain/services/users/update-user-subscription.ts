import { updateUserSubscription } from '@/db/repositories/user-repository'

export async function updateUserSubscriptionService(userId: string) {
  const [user] = await updateUserSubscription(userId)

  return { user }
}
