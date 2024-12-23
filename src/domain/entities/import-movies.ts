import type { schema } from '@/db/schema'
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'

export type ImportMovie = InferSelectModel<typeof schema.importMovies> & {
  __metadata: object
}

export type InsertImportMovie = Omit<
  InferInsertModel<typeof schema.importMovies>,
  'importId' | 'id'
> & {
  __metadata: object
}
