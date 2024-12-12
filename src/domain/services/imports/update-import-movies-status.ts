import { updateImportMoviesStatus } from '@/db/repositories/import-movies-repository'
import { checkAndFinalizeImport } from '@/db/repositories/user-import-repository'
import type { ImportStatusEnum } from '@/domain/value-objects/import-item-status-enum'

export type UpdateUserImportInterface = {
  id: string
  newStatus: ImportStatusEnum
}

export async function updateImportItemStatus({
  id,
  newStatus,
}: UpdateUserImportInterface) {
  const [result] = await updateImportMoviesStatus(id, newStatus)

  checkAndFinalizeImport(result.importId)

  return result
}
