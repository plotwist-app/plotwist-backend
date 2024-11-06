import { describe, expect, it, beforeAll } from 'vitest'

import { makeUser } from '@/test/factories/make-user'
import { makeList } from '@/test/factories/make-list'
import { makeRawListItem } from '@/test/factories/make-list-item'
import { createListItemService } from './create-list-item'
import { faker } from '@faker-js/faker'
import { ListNotFoundError } from '../../errors/list-not-found-error'

import type { List } from '@/domain/entities/lists'
import type { User } from '@/domain/entities/user'

let list: List
let user: User

describe('create list item', () => {
  beforeAll(async () => {
    user = await makeUser()
    list = await makeList({ userId: user.id })
  })

  it('should be able to create a list item', async () => {
    const listItem = makeRawListItem({ listId: list.id })
    const sut = await createListItemService(listItem)

    expect(sut).toEqual({
      listItem: expect.objectContaining({
        tmdbId: listItem.tmdbId,
      }),
    })
  })

  it('should not be able able to create a list item with invalid list id', async () => {
    const listItem = makeRawListItem({ listId: faker.string.uuid() })
    const sut = await createListItemService(listItem)

    expect(sut).toBeInstanceOf(ListNotFoundError)
  })
})
