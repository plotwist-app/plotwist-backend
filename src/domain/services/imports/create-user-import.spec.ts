import { describe, expect, it, beforeAll } from 'vitest'

import { createUserImport } from './create-user-import'

import { makeUser } from '@/test/factories/make-user'

import type { User } from '@/domain/entities/user'
import { makeRawUserImport } from '@/test/factories/make-user-import'

describe('create user import', () => {
  it('should be able to create an user import', async () => {
    const { id: userId } = await makeUser({})

    const rawImport = await makeRawUserImport({ userId })

    const sut = await createUserImport(rawImport)

    expect(sut).toEqual({
      userImport: expect.objectContaining({
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        status: expect.stringContaining('NOT_STARTED'),
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
})
