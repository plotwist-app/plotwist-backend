import { deleteUserActivityById } from '@/db/repositories/user-activities'

export async function deleteUserActivityService(activityId: string) {
  await deleteUserActivityById(activityId)
}
