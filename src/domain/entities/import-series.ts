import type { schema } from '@/db/schema'
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'

export type ImportSeries = InferSelectModel<typeof schema.importSeries> & {
  __metadata: object
}

export type InsertImportSeries = Omit<
  InferInsertModel<typeof schema.importSeries>,
  'importId' | 'id'
> & {
  __metadata: object
}
