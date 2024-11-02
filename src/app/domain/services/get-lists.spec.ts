import { describe, expect, it } from 'vitest'

import { makeUser } from '@/test/factories/make-user'
import { makeList } from '@/test/factories/make-list'
import { getLists } from './get-lists'

describe('get lists', () => {
  it('should be able to get lists by user id ', async () => {
    const user = await makeUser()

    await makeList({ userId: user.id })
    await makeList({ userId: user.id })

    const sut = await getLists({ userId: user.id })

    expect(sut).toBeTruthy()
    expect(sut.lists).toHaveLength(2)
  })
})
