import { describe, expect, it } from 'vitest'

import { makeUser } from '@/test/factories/make-user'

import { makeUserImport } from '@/test/factories/make-user-import'
import { GetUserImport } from './get-user-import-by-id'
import { makeManyRawImportSeries } from '@/test/factories/make-import-series'

describe('get user import', () => {
  it('should be able to get user import by id', async () => {
    const { id: userId } = await makeUser({})

    const series = makeManyRawImportSeries(4, {})

    const result = await makeUserImport({
      userId,
      series,
    })

    const sut = await GetUserImport(result.userImport.id)

    expect(sut).toEqual(result)
  })

  it('should be able to get user import by id when movies are empty', async () => {
    const { id: userId } = await makeUser({})

    const series = makeManyRawImportSeries(4, {})

    const result = await makeUserImport({
      userId,
      series,
      movies: [],
    })

    const sut = await GetUserImport(result.userImport.id)

    expect(sut).toEqual(result)
  })

  it('should be able to get user import by id when series are empty', async () => {
    const { id: userId } = await makeUser({})

    const result = await makeUserImport({
      userId,
      series: [],
    })

    const sut = await GetUserImport(result.userImport.id)

    expect(sut).toEqual(result)
  })
})
