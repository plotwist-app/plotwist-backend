import { describe, expect, it, beforeAll } from 'vitest'

import { makeUser } from '@/test/factories/make-user'
import { makeList } from '@/test/factories/make-list'
import { faker } from '@faker-js/faker'
import { deleteListService } from './delete-list'
import type { InferSelectModel } from 'drizzle-orm'
import type { schema } from '@/db/schema'
import { ListNotFoundError } from '../../errors/list-not-found-error'
import { UnauthorizedError } from '../../errors/unauthorized-error'

let user: InferSelectModel<typeof schema.users>

describe('delete list', () => {
  beforeAll(async () => {
    user = await makeUser()
  })

  it('should be able to delete a list', async () => {
    const list = await makeList({ userId: user.id })
    const sut = await deleteListService({ id: list.id, userId: user.id })

    expect(sut).toBeTruthy()
  })

  it('should not be able able to delete a inexistent list', async () => {
    const sut = await deleteListService({
      id: faker.string.uuid(),
      userId: user.id,
    })

    expect(sut).toBeInstanceOf(ListNotFoundError)
  })

  it('should be able to reject deletion of a list by a non-owner user', async () => {
    const list = await makeList({ userId: user.id })

    const sut = await deleteListService({
      id: list.id,
      userId: faker.string.uuid(),
    })

    expect(sut).toBeInstanceOf(UnauthorizedError)
  })
})
