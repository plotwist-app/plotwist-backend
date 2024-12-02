import { makeUser } from '@/test/factories/make-user'
import { makeUserItem } from '@/test/factories/make-user-item'
import { createUserItemEpisodesService } from '../user-items/create-user-item-episodes'
import { redisClient } from '@/test/mocks/redis'
import { getUserTotalHoursService } from './get-user-total-hours'

const CHERNOBYL = {
  tmdbId: 87108,
  mediaType: 'TV_SHOW',
  totalHours: 5.516666666666667,
} as const

describe('get user total hours count', () => {
  it('should be able to get reviews count', async () => {
    const user = await makeUser()

    const userItem = await makeUserItem({
      userId: user.id,
      tmdbId: CHERNOBYL.tmdbId,
      mediaType: CHERNOBYL.mediaType,
      status: 'WATCHED',
    })

    await createUserItemEpisodesService({
      redis: redisClient,
      tmdbId: userItem.tmdbId,
      userId: user.id,
    })

    const sut = await getUserTotalHoursService(user.id, redisClient)

    expect(sut).toEqual({
      totalHours: CHERNOBYL.totalHours,
    })
  })
})
