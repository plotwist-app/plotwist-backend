import { describe, expect, it, vi } from 'vitest'

import { getUserById } from './get-by-id'

import { makeUser } from '@/test/factories/make-user'
import { randomUUID } from 'node:crypto'
import { UserNotFoundError } from '../../errors/user-not-found'

describe('get user by id', () => {
  it('should be able to get an user by id', async () => {
    const { id } = await makeUser()

    const sut = await getUserById(id)

    expect(sut).toBeTruthy()
  })

  it('should be able to fail when user id does not exists', async () => {
    const randomId = randomUUID()

    const sut = await getUserById(randomId)

    expect(sut).toBeInstanceOf(UserNotFoundError)
  })
})
