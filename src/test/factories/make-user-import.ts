import { insertUserImport } from '@/db/repositories/user-import'
import type { InsertUserImportWithItems } from '@/domain/entities/import'
import { makeRawUserImportItem } from './make-user-import-item'
import { randomUUID } from 'node:crypto'
import { makeUserReturningId } from './make-user'

type Overrides = Partial<InsertUserImportWithItems>

export async function makeRawUserImport(
  overrides: Overrides
): Promise<InsertUserImportWithItems> {
  const rawItem = makeRawUserImportItem({})

  const items = [rawItem]

  return {
    id: overrides.id ?? randomUUID(),
    itensCount: items.length,
    items,
    userId: overrides.userId ?? (await makeUserReturningId({})),
    provider: 'my-anime-list',
    importStatus: 'NOT_STARTED',
    ...overrides,
  }
}

export async function makeUserImport(overrides: Overrides) {
  const userImport = await insertUserImport(await makeRawUserImport(overrides))

  return userImport
}
