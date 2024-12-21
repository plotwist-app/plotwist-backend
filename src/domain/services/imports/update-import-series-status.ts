import { updateImportSeriesStatus as repository } from '@/db/repositories/import-series-repository'
import { checkAndFinalizeImport } from '@/db/repositories/user-import-repository'
import type { ImportStatusEnum } from '@/@types/import-item-status-enum'

export type UpdateUserImportInterface = {
  id: string
  newStatus: ImportStatusEnum
}

export async function updateImportSeriesStatus({
  id,
  newStatus,
}: UpdateUserImportInterface) {
  const [result] = await repository(id, newStatus)

  checkAndFinalizeImport(result.importId)

  return result
}
