import { makeUser } from '@/test/factories/make-user'
import { describe, expect, it, beforeAll } from 'vitest'
import { makeUserEpisode } from '@/test/factories/make-user-episode'
import type { User } from '@/domain/entities/user'
import { getUserEpisodesService } from './get-user-episodes'
import type { UserEpisode } from '@/domain/entities/user-episode'
import { deleteUserEpisodesService } from './delete-user-episodes'

const TMDB_ID = 1396

let user: User
let userEpisode: UserEpisode

describe('delete user episode', () => {
  beforeAll(async () => {
    user = await makeUser()
    userEpisode = await makeUserEpisode({ userId: user.id, tmdbId: TMDB_ID })
  })

  it('should be able to get delete user episode', async () => {
    await deleteUserEpisodesService([userEpisode.id])
    const sut = await getUserEpisodesService({
      userId: user.id,
      tmdbId: TMDB_ID,
    })

    expect(sut.userEpisodes).toHaveLength(0)
  })
})
