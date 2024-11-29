import { insertUserEpisodes } from '@/db/repositories/user-episode'
import { insertUserImport } from '@/db/repositories/user-import'
import type { InsertUserImportWithItems } from '@/domain/entities/import'
import { InsertUserImportItem } from '@/domain/entities/import-item'
import type { InsertUserEpisode } from '@/domain/entities/user-episode'
import { faker } from '@faker-js/faker'

type Overrides = Partial<InsertUserImportWithItems>

export function makeRawUserImport(
  overrides: Overrides
): InsertUserImportWithItems {
  const items = []

  return {
    metadata: { a: 2 },
    provider: 'my-anime-list',
    status: 'NOT_STARTED',
    ...overrides,
  }
}

export async function makeUserEpisode(overrides: Overrides) {
  const [userImport] = await insertUserImport(makeRawUserImport(overrides))

  return userImport
}
