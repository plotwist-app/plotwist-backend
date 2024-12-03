import { makeUser } from '@/test/factories/make-user'
import { makeReview } from '@/test/factories/make-review'
import { getUserBestReviewsService } from './get-user-best-reviews'
import { redisClient } from '@/test/mocks/redis'

describe('get user best reviews', () => {
  it('should be able to get user best reviews', async () => {
    const user = await makeUser()

    const tvShowReview = await makeReview({
      userId: user.id,
      rating: 5,
      mediaType: 'TV_SHOW',
    })

    const movieReview = await makeReview({
      userId: user.id,
      rating: 5,
      mediaType: 'MOVIE',
    })

    const sut = await getUserBestReviewsService({
      userId: user.id,
      language: 'en-US',
      redis: redisClient,
    })

    expect(sut).toEqual({
      bestReviews: expect.arrayContaining([
        expect.objectContaining({
          id: tvShowReview.id,
        }),
        expect.objectContaining({
          id: movieReview.id,
        }),
      ]),
    })
  })
})
