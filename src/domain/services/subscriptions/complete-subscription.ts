import { DomainError } from '@/domain/errors/domain-error'
import { getUserByEmailService } from '../users/get-user-by-email'
import { updateUserSubscriptionService } from '../users/update-user-subscription'
import { createSubscription } from '../subscriptions/create-subscription'

export async function completeSubscription(email: string | null) {
  if (!email) return

  const result = await getUserByEmailService(email)
  if (result instanceof DomainError) {
    return result
  }

  const createSubscriptionResult = await createSubscription({
    type: 'PRO',
    userId: result.user.id,
  })

  if (createSubscriptionResult instanceof DomainError) {
    return createSubscriptionResult
  }

  const updateUserSubscriptionResult = await updateUserSubscriptionService({
    subscriptionType: createSubscriptionResult.subscription.type,
    userId: result.user.id,
  })

  if (updateUserSubscriptionResult instanceof DomainError) {
    return updateUserSubscriptionResult
  }

  return { user: updateUserSubscriptionResult.user }
}
