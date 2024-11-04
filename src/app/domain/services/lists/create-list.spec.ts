import { describe, expect, it, vi } from 'vitest'

import { makeUser } from '@/test/factories/make-user'
import { createList } from './create-list'
import { makeRawList } from '@/test/factories/make-list'
import { faker } from '@faker-js/faker'
import { UserNotFoundError } from '../../errors/user-not-found'

describe('create list', () => {
  it('should be able to create a list', async () => {
    const user = await makeUser()
    const list = makeRawList({ userId: user.id })
    const sut = await createList(list)

    expect(sut).toEqual({
      list: expect.objectContaining({
        title: list.title,
      }),
    })
  })

  it('should not be able able to create a list with non-invalid user id', async () => {
    const list = makeRawList({ userId: faker.string.uuid() })
    const sut = await createList(list)

    expect(sut).toBeInstanceOf(UserNotFoundError)
  })
})
