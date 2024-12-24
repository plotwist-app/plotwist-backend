import { describe, expect, it } from 'vitest'

import { makeUser } from '@/test/factories/make-user'
import { makeRawUserItem } from '@/test/factories/make-user-item'
import { getUserActivitiesService } from './get-user-activities'
import { upsertUserItemService } from '../user-items/upsert-user-item'
import { deleteUserActivityService } from './delete-user-activity'

describe('delete user activity', () => {
  it('should be able to delete user activity', async () => {
    const user = await makeUser()
    await upsertUserItemService(
      makeRawUserItem({ status: 'WATCHED', userId: user.id })
    )

    const { userActivities } = await getUserActivitiesService({
      pageSize: 20,
      userId: user.id,
    })

    await deleteUserActivityService(userActivities[0].id)

    const sut = await getUserActivitiesService({
      pageSize: 20,
      userId: user.id,
    })

    expect(sut.userActivities).toHaveLength(0)
    expect(sut.nextCursor).toBeFalsy()
  })
})
