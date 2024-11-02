import { insertReview } from '@/db/repositories/reviews-repository'
import type { LanguagesEnum } from '../../value_objects/languages_enum'
import type { MediaTypeEnum } from '../../value_objects/media_type_enum'

import { PgIntegrityConstraintViolation } from '@/db/utils/postgres-errors'
import postgres from 'postgres'

export interface CreateReviewInterface {
  rating: number
  userId: string
  review: string
  hasSpoilers: boolean
  tmdbTitle: string
  tmdbPosterPath: string
  tmdbOverView: string
  mediaType: MediaTypeEnum
  language: LanguagesEnum
}

export async function createReview(params: CreateReviewInterface) {
  try {
    const [review] = await insertReview(params)

    return review
  } catch (error: unknown) {
    handleError(error)
  }
}

function handleError(error: unknown) {
  console.log(error)

  throw error
}
