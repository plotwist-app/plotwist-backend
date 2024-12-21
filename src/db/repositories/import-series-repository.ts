import type { ImportStatusEnum } from '@/@types/import-item-status-enum'
import { db } from '..'
import { schema } from '../schema'
import { eq } from 'drizzle-orm'

export async function updateImportSeriesStatus(
  id: string,
  status: ImportStatusEnum
) {
  return await db
    .update(schema.importSeries)
    .set({ importStatus: status })
    .where(eq(schema.importSeries.id, id))
    .returning()
}
