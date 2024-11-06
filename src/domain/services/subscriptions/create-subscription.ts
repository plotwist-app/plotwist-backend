import { insertSubscription } from '@/db/repositories/subscription-repository'
import type { InsertSubscriptionModel } from '@/domain/entities/subscription'

export async function createSubscription(params: InsertSubscriptionModel) {
  const [subscription] = await insertSubscription(params)

  return { subscription }
}
