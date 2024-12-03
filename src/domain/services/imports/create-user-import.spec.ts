import { describe, expect, it } from 'vitest'

import { createUserImport } from './create-user-import'

import { makeUser } from '@/test/factories/make-user'

import { makeRawUserImport } from '@/test/factories/make-user-import'
import { randomUUID } from 'node:crypto'
import { UserNotFoundError } from '@/domain/errors/user-not-found'
import { makeManyRawImportMovies } from '@/test/factories/make-import-movies'
import { makeManyRawImportSeries } from '@/test/factories/make-import-series'

describe('create user import', () => {
  it('should be able to create an user import with series and movies', async () => {
    const { id: userId } = await makeUser({})

    const movies = makeManyRawImportMovies(5, { importStatus: 'NOT_STARTED' })

    const series = makeManyRawImportSeries(5, { importStatus: 'NOT_STARTED' })

    const rawImport = await makeRawUserImport({
      userId,
      movies,
      series,
    })

    const sut = await createUserImport(rawImport)

    expect(sut).toEqual({
      userImport: expect.objectContaining({
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        importStatus: expect.stringContaining('NOT_STARTED'),
      }),
      series: expect.arrayContaining(
        rawImport.series.map(item =>
          expect.objectContaining({
            importStatus: expect.stringContaining('NOT_STARTED'),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          })
        )
      ),
      movies: expect.arrayContaining(
        rawImport.movies.map(item =>
          expect.objectContaining({
            importStatus: expect.stringContaining('NOT_STARTED'),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          })
        )
      ),
    })
  })

  it('should be able to insert only import movies', async () => {
    const { id: userId } = await makeUser({})

    const movies = makeManyRawImportMovies(5, { importStatus: 'NOT_STARTED' })

    const rawImport = await makeRawUserImport({
      userId,
      movies,
      series: [],
    })

    const sut = await createUserImport(rawImport)

    expect(sut).toEqual({
      userImport: expect.objectContaining({
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        importStatus: expect.stringContaining('NOT_STARTED'),
      }),
      series: [],
      movies: expect.arrayContaining(
        rawImport.movies.map(item =>
          expect.objectContaining({
            importStatus: expect.stringContaining('NOT_STARTED'),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          })
        )
      ),
    })
  })

  it('should be able to insert only import series', async () => {
    const { id: userId } = await makeUser({})

    const series = makeManyRawImportSeries(5, { importStatus: 'NOT_STARTED' })

    const rawImport = await makeRawUserImport({
      userId,
      movies: [],
      series,
    })

    const sut = await createUserImport(rawImport)

    expect(sut).toEqual({
      userImport: expect.objectContaining({
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        importStatus: expect.stringContaining('NOT_STARTED'),
      }),
      movies: [],
      series: expect.arrayContaining(
        rawImport.movies.map(item =>
          expect.objectContaining({
            importStatus: expect.stringContaining('NOT_STARTED'),
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
