import { insertFollow } from '@/db/repositories/followers-repository'
import { insertUserActivity } from '@/db/repositories/user-activities'
import { PgIntegrityConstraintViolation } from '@/db/utils/postgres-errors'
import { FollowAlreadyRegisteredError } from '@/domain/errors/follow-already-registered'
import postgres from 'postgres'

export type CreateFollowServiceInput = {
  followerId: string
  followedId: string
}

export async function createFollowService({
  followedId,
  followerId,
}: CreateFollowServiceInput) {
  try {
    const [follow] = await insertFollow({ followedId, followerId })

    await insertUserActivity({
      activityType: 'FOLLOW_USER',
      userId: follow.followerId,
      metadata: follow,
    })

    return { follow }
  } catch (error) {
    if (error instanceof postgres.PostgresError) {
      if (error.code === PgIntegrityConstraintViolation.UniqueViolation) {
        return new FollowAlreadyRegisteredError()
      }
    }

    throw error
  }
}
