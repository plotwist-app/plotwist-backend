import type { CreateFollowServiceInput } from '@/domain/services/follows/create-follow'
import { db } from '..'
import { schema } from '../schema'
import type { GetFollowServiceInput } from '@/domain/services/follows/get-follow'
import { and, eq } from 'drizzle-orm'
import type { DeleteFollowServiceInput } from '@/domain/services/follows/delete-follow'

export async function insertFollow({
  followedId,
  followerId,
}: CreateFollowServiceInput) {
  return db.insert(schema.followers).values({
    followedId,
    followerId,
  })
}

export async function getFollow({
  followedId,
  followerId,
}: GetFollowServiceInput) {
  return db
    .select()
    .from(schema.followers)
    .where(
      and(
        eq(schema.followers.followedId, followedId),
        eq(schema.followers.followerId, followerId)
      )
    )
}

export async function deleteFollow({
  followedId,
  followerId,
}: DeleteFollowServiceInput) {
  return db
    .delete(schema.followers)
    .where(
      and(
        eq(schema.followers.followedId, followedId),
        eq(schema.followers.followerId, followerId)
      )
    )
}
