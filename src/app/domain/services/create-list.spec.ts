import { describe, expect, it, vi } from 'vitest'

import { makeUser } from '@/test/factories/make-user'
import { createUser } from './create-user'
import { createList } from './create-list'
import { makeRawList } from '@/test/factories/make-list'

describe('create list', () => {
  it('should be able to create a list', async () => {
    const user = await makeUser()
    const list = makeRawList({ userId: user.id })
    const sut = await createList(list)

    expect(sut).toBeTruthy()
    expect(sut).toEqual({
      list: expect.objectContaining({
        title: list.title,
      }),
    })
  })
})
