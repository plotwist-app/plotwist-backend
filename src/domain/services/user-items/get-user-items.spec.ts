import { makeUser } from '@/test/factories/make-user'
import { makeUserItem } from '@/test/factories/make-user-item'
import { beforeAll, describe, expect, it } from 'vitest'

import type { User } from '@/domain/entities/user'
import type { UserItem } from '@/domain/entities/user-item'
import { getUserItemsService } from './get-user-items'

let user: User
let userItem: UserItem

describe('get user items', () => {
  beforeAll(async () => {
    user = await makeUser()
    userItem = await makeUserItem({ userId: user.id, status: 'WATCHED' })
  })

  it('should be able to get user items', async () => {
    const sut = await getUserItemsService({
      status: userItem.status,
      userId: user.id,
    })

    expect(sut).toEqual({
      userItems: expect.arrayContaining([
        expect.objectContaining({
          status: userItem.status,
        }),
      ]),
    })
  })
})
