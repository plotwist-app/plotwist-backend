import { DomainError } from '@/domain/errors/domain-error'
import { getUserByEmailService } from '../users/get-user-by-email'
import { updateUserSubscriptionService } from '../users/update-user-subscription'
import { createSubscription } from '../subscriptions/create-subscription'

export async function checkoutSessionCompleted(email: string | null) {
  if (!email) return

  const result = await getUserByEmailService(email)
  if (result instanceof DomainError) return

  await updateUserSubscriptionService(result.user.id)
  await createSubscription({ type: 'PRO', userId: result.user.id })

  return { message: 'Checkout session completed successfully', email }
}
