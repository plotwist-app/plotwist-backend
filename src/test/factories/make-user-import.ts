import { insertUserImport } from '@/db/repositories/user-import'
import type { InsertUserImportWithItems } from '@/domain/entities/import'
import { makeRawUserImportItem } from './make-user-import-item'
import { randomUUID } from 'node:crypto'

type Overrides = Partial<InsertUserImportWithItems>

export function makeRawUserImport(
  overrides: Overrides
): InsertUserImportWithItems {
  const rawItem = makeRawUserImportItem({})

  const items = [rawItem]

  return {
    id: overrides.id ?? randomUUID(),
    itensCount: items.length,
    items,
    userId: overrides.userId ?? randomUUID(),
    provider: 'my-anime-list',
    status: 'NOT_STARTED',
    ...overrides,
  }
}

export async function makeUserEpisode(overrides: Overrides) {
  const userImport = await insertUserImport(makeRawUserImport(overrides))

  return userImport
}
