import { describe, expect, it } from 'vitest'

import { makeUser } from '@/test/factories/make-user'
import { makeList } from '@/test/factories/make-list'
import { getLists } from './get-lists'
import { UserNotFoundError } from '../../errors/user-not-found'
import { faker } from '@faker-js/faker'

describe('get lists', () => {
  it('should be able to get lists by user id ', async () => {
    const user = await makeUser()

    const firstList = await makeList({ userId: user.id })
    const secondList = await makeList({ userId: user.id })

    const sut = await getLists({ userId: user.id })

    expect(sut).toEqual({
      lists: expect.arrayContaining([
        expect.objectContaining({ id: firstList.id }),
        expect.objectContaining({ id: secondList.id }),
      ]),
    })
  })

  it('should not be able to get lists by invalid user id', async () => {
    const sut = await getLists({ userId: faker.string.uuid() })

    expect(sut).toBeInstanceOf(UserNotFoundError)
  })
})
