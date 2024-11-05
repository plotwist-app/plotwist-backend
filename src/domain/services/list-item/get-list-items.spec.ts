import { describe, expect, it, beforeAll } from 'vitest'

import { makeUser } from '@/test/factories/make-user'
import { makeList } from '@/test/factories/make-list'
import type { InferSelectModel } from 'drizzle-orm'
import type { schema } from '@/db/schema'
import { makeListItem } from '@/test/factories/make-list-item'
import { faker } from '@faker-js/faker'
import { ListNotFoundError } from '../../errors/list-not-found-error'
import { getListItemsService } from './get-list-items'

let list: InferSelectModel<typeof schema.lists>
let user: InferSelectModel<typeof schema.users>

describe('get list items', () => {
  beforeAll(async () => {
    user = await makeUser()
    list = await makeList({ userId: user.id })
  })

  it('should be able to get list items', async () => {
    const listItem = await makeListItem({ listId: list.id })
    const sut = await getListItemsService({ listId: list.id })

    expect(sut).toEqual({
      listItems: expect.arrayContaining([
        expect.objectContaining({ id: listItem.id }),
      ]),
    })
  })

  it('should not be able able to get list items with invalid list id', async () => {
    const sut = await getListItemsService({ listId: faker.string.uuid() })

    expect(sut).toBeInstanceOf(ListNotFoundError)
  })
})
