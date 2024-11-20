import { insertUserEpisode } from '@/db/repositories/user-episode'
import { PgIntegrityConstraintViolation } from '@/db/utils/postgres-errors'
import type { InsertUserEpisode } from '@/domain/entities/user-episode'
import { UserEpisodeAlreadyRegisteredError } from '@/domain/errors/user-episode-already-registered-error'
import postgres from 'postgres'

export async function createUserEpisodeService(values: InsertUserEpisode) {
  try {
    const [userEpisode] = await insertUserEpisode(values)

    return { userEpisode }
  } catch (error) {
    if (error instanceof postgres.PostgresError) {
      if (error.code === PgIntegrityConstraintViolation.UniqueViolation) {
        return new UserEpisodeAlreadyRegisteredError()
      }
    }

    throw error
  }
}
