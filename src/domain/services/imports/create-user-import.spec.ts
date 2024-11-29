import { describe, expect, it, beforeAll } from 'vitest'

import { createUserImport } from './create-user-import'

import { makeUser } from '@/test/factories/make-user'

import type { User } from '@/domain/entities/user'
import { makeUserEpisode } from '@/test/factories/make-user-import'

describe('create like', () => {
  it('should be able to create an user import', async () => {
    const sut = makeUserEpisode({})

    expect(sut).toEqual({
      like: expect.objectContaining(true),
    })
  })
})
