import type { InsertUserEpisode } from '@/domain/entities/user-episode'
import { db } from '..'
import { schema } from '../schema'

export async function insertUserEpisode(values: InsertUserEpisode) {
  return db.insert(schema.userEpisodes).values(values).returning()
}
