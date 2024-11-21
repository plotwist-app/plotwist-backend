import type { InsertUserEpisode } from '@/domain/entities/user-episode'
import { db } from '..'
import { schema } from '../schema'
import type { GetUserEpisodesInput } from '@/domain/services/user-episodes/get-user-episodes'
import { and, eq, inArray } from 'drizzle-orm'

export async function insertUserEpisodes(values: InsertUserEpisode[]) {
  return db.insert(schema.userEpisodes).values(values).returning()
}

export async function selectUserEpisodes({
  userId,
  tmdbId,
}: GetUserEpisodesInput) {
  return db
    .select()
    .from(schema.userEpisodes)
    .where(
      and(
        eq(schema.userEpisodes.userId, userId),
        eq(schema.userEpisodes.tmdbId, tmdbId)
      )
    )
    .orderBy(schema.userEpisodes.episodeNumber)
}

export async function deleteUserEpisodes(ids: string[]) {
  return db
    .delete(schema.userEpisodes)
    .where(inArray(schema.userEpisodes.id, ids))
}
