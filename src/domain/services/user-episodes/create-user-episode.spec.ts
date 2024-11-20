import { makeUser } from '@/test/factories/make-user'
import { describe, expect, it, beforeAll } from 'vitest'
import { createUserEpisodeService } from './create-user-episode'
import {
  makeRawUserEpisode,
  makeUserEpisode,
} from '@/test/factories/make-user-episode'
import type { User } from '@/domain/entities/user'
import { UserEpisodeAlreadyRegisteredError } from '@/domain/errors/user-episode-already-registered-error'

let user: User

describe('create user episode', () => {
  beforeAll(async () => {
    user = await makeUser()
  })

  it('should be able to create a user episode', async () => {
    const userEpisode = makeRawUserEpisode({ userId: user.id })
    const sut = await createUserEpisodeService(userEpisode)

    expect(sut).toEqual({
      userEpisode: expect.objectContaining(userEpisode),
    })
  })

  it('should not be able to create user episode if the episode is already registered', async () => {
    const userEpisode = await makeUserEpisode({ userId: user.id })
    const sut = await createUserEpisodeService(userEpisode)

    expect(sut).toBeInstanceOf(UserEpisodeAlreadyRegisteredError)
  })
})
