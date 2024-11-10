import { db } from '@/db'
import { schema } from '@/db/schema'
import type { InsertSubscriptionModel } from '@/domain/entities/subscription'

export async function insertSubscription(params: InsertSubscriptionModel) {
  return db.insert(schema.subscriptions).values(params).returning()
}
