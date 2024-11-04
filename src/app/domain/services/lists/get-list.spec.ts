import { describe, expect, it, beforeAll } from 'vitest'

import { makeUser } from '@/test/factories/make-user'
import { makeList } from '@/test/factories/make-list'
import { faker } from '@faker-js/faker'
import { deleteListService } from './delete-list'
import type { InferSelectModel } from 'drizzle-orm'
import type { schema } from '@/db/schema'
import { ListNotFoundError } from '../../errors/list-not-found-error'
import { getListService } from './get-list'

let user: InferSelectModel<typeof schema.users>

describe('delete list', () => {
  beforeAll(async () => {
    user = await makeUser()
  })

  it('should be able to get a list', async () => {
    const list = await makeList({ userId: user.id })
    const sut = await getListService({
      id: list.id,
    })

    expect(sut).toEqual({
      list: expect.objectContaining({
        title: list.title,
      }),
    })
  })

  it('should not be able able to get a inexistent list', async () => {
    const sut = await getListService({
      id: faker.string.uuid(),
    })

    expect(sut).toBeInstanceOf(ListNotFoundError)
  })
})
