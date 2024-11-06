import { describe, expect, it, beforeAll } from 'vitest'

import { makeUser } from '@/test/factories/make-user'
import { makeList } from '@/test/factories/make-list'
import { faker } from '@faker-js/faker'
import { deleteListService } from './delete-list'
import { ListNotFoundError } from '../../errors/list-not-found-error'
import type { User } from '@/domain/entities/user'

let user: User

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
})
