import { describe, expect, it } from 'vitest'

import { makeUser } from '@/test/factories/make-user'
import { makeRawUserItem } from '@/test/factories/make-user-item'
import { getUserActivitiesService } from './get-user-activities'
import { upsertUserItemService } from '../user-items/upsert-user-item'

describe('get user activities', () => {
  it('should be able to get user activities', async () => {
    const user = await makeUser()

    await Promise.all(
      Array.from({ length: 21 }, async (_, index) => {
        const userItem = makeRawUserItem({ status: 'WATCHED', userId: user.id })
        return await upsertUserItemService(userItem)
      })
    )

    const sut = await getUserActivitiesService({
      pageSize: 20,
      userId: user.id,
    })

    expect(sut.userActivities).toHaveLength(20)
    expect(sut.nextCursor).toBeTruthy()
  })
})
