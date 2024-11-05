import { describe, expect, it, beforeAll } from 'vitest'

import { makeUser } from '@/test/factories/make-user'
import { makeList } from '@/test/factories/make-list'
import type { InferSelectModel } from 'drizzle-orm'
import type { schema } from '@/db/schema'
import { makeListItem, makeRawListItem } from '@/test/factories/make-list-item'
import { createListItemService } from './create-list-item'
import { faker } from '@faker-js/faker'
import { ListNotFoundError } from '../../errors/list-not-found-error'
import { deleteListItemService } from './delete-list-item'
import { ListItemNotFoundError } from '@/domain/errors/list-item-not-found-error'
import { UnauthorizedError } from '@/domain/errors/unauthorized-error'

let list: InferSelectModel<typeof schema.lists>
let user: InferSelectModel<typeof schema.users>

describe('delete list item', () => {
  beforeAll(async () => {
    user = await makeUser()
    list = await makeList({ userId: user.id })
  })

  it('should be able to delete a list item', async () => {
    const listItem = await makeListItem({ listId: list.id })
    const sut = await deleteListItemService({
      id: listItem.id,
      authenticatedUserId: user.id,
    })

    expect(sut).toBeTruthy()
  })

  it('should not be able to delete list item with invalid id', async () => {
    const sut = await deleteListItemService({
      id: faker.string.uuid(),
      authenticatedUserId: user.id,
    })

    expect(sut).toBeInstanceOf(ListItemNotFoundError)
  })

  it('should not be able to delete list item with invalid user id', async () => {
    const listItem = await makeListItem({ listId: list.id })
    const sut = await deleteListItemService({
      id: listItem.id,
      authenticatedUserId: faker.string.uuid(),
    })

    expect(sut).toBeInstanceOf(UnauthorizedError)
  })
})
