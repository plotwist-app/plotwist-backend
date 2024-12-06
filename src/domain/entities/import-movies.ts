import type { schema } from '@/db/schema'
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'

export type ImportMovie = InferSelectModel<typeof schema.importMovies>
export type InsertImportMovie = InferInsertModel<typeof schema.importMovies>

export type InsertUserImportWithoutImportId = Omit<
  InsertImportMovie,
  'importId'
>
