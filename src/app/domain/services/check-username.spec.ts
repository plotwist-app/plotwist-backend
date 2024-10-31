import { describe, expect, it } from 'vitest'

import { faker } from '@faker-js/faker'

import { alreadyExitsUsername } from './check-username'
import { makeUser } from '@/test/factories/make-user'
import { UsernameAlreadyRegisteredError } from '../errors/username-already-registered'

describe('check username', () => {
  it('should be able to check available username', async () => {
    const username = faker.internet.userName()
    const sut = await alreadyExitsUsername({ username })

    expect(sut).toBeTruthy()
    expect(sut).toEqual({
      available: true,
    })
  })

  it('should be able to check unavailable username', async () => {
    const user = await makeUser()
    const sut = await alreadyExitsUsername({ username: user.username })

    expect(sut).toBeInstanceOf(UsernameAlreadyRegisteredError)
  })
})
