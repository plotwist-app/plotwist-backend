import { updateImportMoviesStatus as repository } from '@/db/repositories/import-movies-repository'
import { checkAndFinalizeImport } from '@/db/repositories/user-import-repository'
import type { ImportStatusEnum } from '@/@types/import-item-status-enum'

export async function updateImportMoviesStatus(
  id: string,
  newStatus: ImportStatusEnum
) {
  const [result] = await repository(id, newStatus)

  checkAndFinalizeImport(result.importId)

  return result
}
