import { faker } from '@faker-js/faker'
import type { InsertReviewModel, Review } from '@/domain/entities/review'
import { insertReview } from '@/db/repositories/reviews-repository'

type Overrides = Partial<Review> & Pick<Review, 'userId'>

export function makeRawReview(overrides: Overrides): InsertReviewModel {
  return {
    language: 'de-DE',
    mediaType: 'MOVIE',
    rating: faker.number.int({ min: 0, max: 5 }),
    review: faker.lorem.paragraph(2),
    tmdbOverview: faker.lorem.paragraph(1),
    tmdbId: faker.number.int({ min: 0, max: 1_000 }),
    tmdbTitle: faker.company.name(),
    tmdbPosterPath: faker.internet.url(),
    hasSpoilers: faker.datatype.boolean(),
    ...overrides,
  }
}

export async function makeReview(overrides: Overrides) {
  const [review] = await insertReview(makeRawReview(overrides))

  return review
}