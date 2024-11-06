import { describe, expect, it, beforeAll } from 'vitest'

import { makeUser } from '@/test/factories/make-user'
import { makeList } from '@/test/factories/make-list'
import { faker } from '@faker-js/faker'
import type { InferSelectModel } from 'drizzle-orm'
import type { schema } from '@/db/schema'
import { ListNotFoundError } from '../../errors/list-not-found-error'
import { updateListService } from './update-list'
import { updateListBannerService } from './update-list-banner'

let user: InferSelectModel<typeof schema.users>
let list: InferSelectModel<typeof schema.lists>

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
