import { selectUserActivities } from '@/db/repositories/user-activities'
import type { SelectUserActivities } from '@/domain/entities/user-activity'

export async function getUserActivitiesService(values: SelectUserActivities) {
  const userActivities = await selectUserActivities(values)

  return { userActivities }
}
