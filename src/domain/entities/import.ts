import type { schema } from '@/db/schema'
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import type { InsertImportMovie } from './import-movies'
import type { InsertImportSeries } from './import-series'

export type UserImport = InferSelectModel<typeof schema.userImports>

export type DetailedUserImport = UserImport & {
  movies: InsertImportMovie[]
  series: InsertImportSeries[]
}

type InsertUserImport = InferInsertModel<typeof schema.userImports>

export type InsertUserImportWithItems = InsertUserImport & {
  movies: InsertImportMovie[]
  series: InsertImportSeries[]
}
