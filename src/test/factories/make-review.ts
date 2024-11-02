import { faker } from '@faker-js/faker'
import type { Review } from '@/app/domain/entities/review'
import { insertReview } from '@/db/repositories/reviews-repository'
import type { InferColumnsDataTypes, InferInsertModel } from 'drizzle-orm'
import type { schema } from '@/db/schema'
import { getRandomItem } from '@/utils/random-item'
import { randomUUID } from 'node:crypto'

type Overrides = MakeReviewType

type MakeReviewType = InferInsertModel<typeof schema.reviews>

export function makeRawReview(
  overrides: Overrides = { userId: randomUUID() }
): Overrides {
  const randomRating = Math.floor(Math.random() * 20)
  const randomTmdbId = Math.floor(Math.random() * 100)
  const randomHasSpoilerState = getRandomItem([true, false])

  // const randomLanguage: InferColumnsDataTypes<typeof schema.reviews.mediaType> =
  //   getRandomItem([
  //     'en-US',
  //     'es-ES',
  //     'fr-FR',
  //     'it-IT',
  //     'de-DE',
  //     'pt-BR',
  //     'ja-JP',
  //   ])

  const randomMediaType = getRandomItem(['TV_SHOW', 'MOVIE'])

  return {
    language: 'en-US',
    mediaType: 'MOVIE',
    rating: randomRating,
    review: faker.lorem.paragraph(2),
    tmdbOverview: faker.lorem.paragraph(1),
    tmdbId: randomTmdbId,
    tmdbTitle: faker.company.name(),
    tmdbPosterPath: faker.internet.url(),
    hasSpoilers: randomHasSpoilerState,
    ...overrides,
  }
}

export async function makeReview(reviewParams: Review) {
  const [review] = await insertReview(makeRawReview(reviewParams))

  return review
}
