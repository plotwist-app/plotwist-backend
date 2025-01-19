import { describe, it, expect, vi, beforeEach } from 'vitest'

import { getReviewSummaryService } from './get-review-summary'
import { redisClient } from '@/test/mocks/redis'

vi.mock('../rotten-tomatoes/reviews', () => ({
  getRottenTomatoesReviewsService: vi.fn(),
}))

vi.mock('../open-ai/generate-review-summary', () => ({
  generateReviewSummary: vi.fn(),
}))

vi.mock('../tmdb/get-tmdb-movie', () => ({
  getTMDBMovieService: vi.fn(),
}))

import { getRottenTomatoesReviewsService } from '../rotten-tomatoes/reviews'
import { generateReviewSummary } from '../open-ai/generate-review-summary'
import { getTMDBMovieService } from '../tmdb/get-tmdb-movie'

const TMDB_ID = '238'
const MEDIA_TYPE = 'MOVIE'
const LANGUAGE = 'en-US'
const MOVIE_TITLE = 'The Godfather'

describe('get review summary', () => {
  beforeEach(async () => {
    vi.clearAllMocks()
    await redisClient.flushall()

    vi.mocked(getTMDBMovieService).mockResolvedValue({
      title: MOVIE_TITLE,
      posterPath: 'posterPath',
      backdropPath: 'backdropPath',
    })
  })

  it('should return AI generated summary when reviews are found', async () => {
    const mockReviews = [
      { text: 'Amazing movie, a true masterpiece' },
      { text: 'One of the greatest films ever made' },
    ]

    const expectedSummary =
      'This classic film is universally acclaimed as a masterpiece'

    vi.mocked(getRottenTomatoesReviewsService).mockResolvedValue(mockReviews)
    vi.mocked(generateReviewSummary).mockResolvedValue(expectedSummary)

    const result = await getReviewSummaryService({
      redis: redisClient,
      values: {
        tmdbId: TMDB_ID,
        mediaType: MEDIA_TYPE,
        language: LANGUAGE,
      },
    })

    expect(result.summary).toBe(expectedSummary)
  })

  it('should return null summary when no reviews are found', async () => {
    vi.mocked(getRottenTomatoesReviewsService).mockResolvedValue([])

    const result = await getReviewSummaryService({
      redis: redisClient,
      values: {
        tmdbId: TMDB_ID,
        mediaType: MEDIA_TYPE,
        language: LANGUAGE,
      },
    })

    expect(result.summary).toBeNull()
  })
})
