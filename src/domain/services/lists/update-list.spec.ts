import { describe, expect, it, beforeAll } from 'vitest'

import { makeUser } from '@/test/factories/make-user'
import { makeList } from '@/test/factories/make-list'
import { faker } from '@faker-js/faker'
import type { InferSelectModel } from 'drizzle-orm'
import type { schema } from '@/db/schema'
import { ListNotFoundError } from '../../errors/list-not-found-error'
import { updateListService } from './update-list'

let user: InferSelectModel<typeof schema.users>
let list: InferSelectModel<typeof schema.lists>

describe('update list', () => {
  beforeAll(async () => {
    user = await makeUser()
    list = await makeList({ userId: user.id })
  })

  it('should be able to update a list', async () => {
    const sut = await updateListService({
      id: list.id,
      userId: user.id,
      values: {
        ...list,
        title: 'new title',
      },
    })

    expect(sut).toEqual({
      list: expect.objectContaining({
        title: 'new title',
      }),
    })
  })

  it('should not be able able to delete a inexistent list', async () => {
    const sut = await updateListService({
      id: faker.string.uuid(),
      userId: user.id,
      values: {
        ...list,
      },
    })

    expect(sut).toBeInstanceOf(ListNotFoundError)
  })
})
