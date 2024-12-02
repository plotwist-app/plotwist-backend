import { describe, expect, it } from 'vitest'

import { createUserImport } from './create-user-import'

import { makeUser } from '@/test/factories/make-user'

import { makeRawUserImport } from '@/test/factories/make-user-import'
import { randomUUID } from 'node:crypto'
import { UserNotFoundError } from '@/domain/errors/user-not-found'

describe('create user import', () => {
  it('should be able to create an user import', async () => {
    const { id: userId } = await makeUser({})

    const rawImport = await makeRawUserImport({ userId })

    const sut = await createUserImport(rawImport)

    expect(sut).toEqual({
      userImport: expect.objectContaining({
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        importStatus: expect.stringContaining('NOT_STARTED'),
      }),
      items: expect.arrayContaining(
        rawImport.items.map(item =>
          expect.objectContaining({
            importStatus: expect.stringContaining(item.importStatus),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          })
        )
      ),
    })
  })

  it('should be able to return an error when insert with invalid userId', async () => {
    const fakeUserId = randomUUID()

    const rawImport = await makeRawUserImport({ userId: fakeUserId })

    const sut = await createUserImport(rawImport)

    expect(sut).toBeInstanceOf(UserNotFoundError)
  })
})
