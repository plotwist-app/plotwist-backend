import { insertUserActivity } from '@/db/repositories/user-activities'
import { upsertUserItem } from '@/db/repositories/user-item-repository'
import type { InsertUserItem } from '@/domain/entities/user-item'
import * as changeKeys from 'change-case/keys'

export async function upsertUserItemService(values: InsertUserItem) {
  const [userItem] = await upsertUserItem(values)

  await insertUserActivity({
    activityType: 'CHANGE_STATUS',
    userId: values.userId,
    metadata: JSON.stringify(values),
  })

  return { userItem: changeKeys.camelCase(userItem) }
}
