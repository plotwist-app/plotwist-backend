import { redisClient } from '@/test/mocks/redis'
import { generateUserRecommendationsService } from './generate-user-recommendations'
import { getProUsersDetailsService } from '../users/get-pro-users'
import { randomUUID } from 'node:crypto'

const userId = randomUUID()

vi.mock('../users/get-pro-users', () => ({
  getProUsersDetailsService: vi.fn().mockResolvedValue({
    users: [
      {
        id: '149280fd-85ce-42fe-bf97-e21fd41fdacb',
        email: 'henrique@gmail.com',
        username: 'henrique',
        avatarUrl: 'https://github.com/lui7henrique.png',
        preferences: {
          id: 'd6e44a03-faa4-4228-8b4d-45cc6a7e34ae',
          userId: '149280fd-85ce-42fe-bf97-e21fd41fdacb',
          watchProvidersIds: [119, 337, 8, 307],
          watchRegion: 'BR',
        },
        items: [
          {
            id: '4043cd6c-6fb0-4283-9b58-b2426ba72764',
            tmdbId: 12,
            mediaType: 'MOVIE',
          },
        ],
      },
    ],
  }),
}))

vi.mock('../user-preferences/get-user-preferences', () => ({
  getUserPreferencesService: vi.fn().mockResolvedValue({
    userPreferences: {
      watchRegion: 'BR',
      watchProvidersIds: [119, 337, 8, 307],
    },
  }),
}))

vi.mock('../user-stats/get-user-best-reviews', () => ({
  getUserBestReviewsService: vi.fn().mockResolvedValue({
    bestReviews: [],
  }),
}))

vi.mock('./get-user-recommendations', () => ({
  getUserRecommendationsService: vi.fn().mockResolvedValue({
    recommendations: [],
  }),
}))

vi.mock('./send-user-recommendations-email', () => ({
  sendUserRecommendationsEmailService: vi.fn(),
}))

describe('generateUserRecommendationsService', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should generate recommendations for users', async () => {
    await generateUserRecommendationsService(redisClient)
    expect(vi.mocked(getProUsersDetailsService)).toHaveBeenCalledTimes(1)
  })

  it('should throw and log error when something fails', async () => {
    const error = new Error('Test error')
    vi.mocked(getProUsersDetailsService).mockRejectedValueOnce(error)

    await expect(
      generateUserRecommendationsService(redisClient)
    ).rejects.toThrow(error)
  })
})
