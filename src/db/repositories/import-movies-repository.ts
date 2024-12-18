import type { ImportStatusEnum } from '@/domain/value-objects/import-item-status-enum'
import { db } from '..'
import { schema } from '../schema'
import { eq } from 'drizzle-orm'

export async function updateImportMoviesStatus(
  id: string,
  status: ImportStatusEnum
) {
  return await db
    .update(schema.importMovies)
    .set({ importStatus: status })
    .where(eq(schema.importMovies.id, id))
    .returning()
}
