import { describe, expect, it, beforeAll } from 'vitest'

import { makeUser } from '@/test/factories/make-user'
import { makeList } from '@/test/factories/make-list'
import { faker } from '@faker-js/faker'
import { ListNotFoundError } from '../../errors/list-not-found-error'
import { updateListBannerService } from './update-list-banner'
import type { List } from '@/domain/entities/lists'
import type { User } from '@/domain/entities/user'

let user: User
let list: List

describe('update list banner', () => {
  beforeAll(async () => {
    user = await makeUser()
    list = await makeList({ userId: user.id })
  })

  it('should be able to update list banner', async () => {
    const sut = await updateListBannerService({
      listId: list.id,
      userId: user.id,
      bannerPath: 'new',
    })

    expect(sut).toEqual({
      list: expect.objectContaining({
        bannerPath: 'new',
      }),
    })
  })

  it('should not be able to update banner of a inexistent list', async () => {
    const sut = await updateListBannerService({
      listId: faker.string.uuid(),
      userId: user.id,
      bannerPath: 'new',
    })

    expect(sut).toBeInstanceOf(ListNotFoundError)
  })
})
