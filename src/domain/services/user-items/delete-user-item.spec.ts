import { makeUser } from '@/test/factories/make-user'
import { describe, expect, it, beforeAll } from 'vitest'
import { faker } from '@faker-js/faker'
import { UserNotFoundError } from '@/domain/errors/user-not-found'
import { makeUserItem } from '@/test/factories/make-watchlist-item'

import type { User } from '@/domain/entities/user'
import type { UserItem } from '@/domain/entities/user-item'
import { deleteUserItemService } from './delete-user-item'
import { UserItemNotFoundError } from '@/domain/errors/user-item-not-found-error'

let user: User
let userItem: UserItem

describe('delete user item', () => {
  beforeAll(async () => {
    user = await makeUser()
    userItem = await makeUserItem({ userId: user.id })
  })

  it('should be able to delete a user item', async () => {
    const sut = await deleteUserItemService(userItem.id)

    expect(sut).toBeTruthy()
  })

  it('should be able to fail with invalid id', async () => {
    const sut = await deleteUserItemService(faker.string.uuid())

    expect(sut).toBeInstanceOf(UserItemNotFoundError)
  })
})
