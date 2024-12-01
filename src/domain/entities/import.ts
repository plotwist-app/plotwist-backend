import type { schema } from '@/db/schema'
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import type { InsertUserImportItem } from './import-item'

export type UserImport = InferSelectModel<typeof schema.userImports>

type InsertUserImport = InferInsertModel<typeof schema.userImports>

export type InsertUserImportWithItems = InsertUserImport & {
  items: Omit<InsertUserImportItem, 'importId'>[]
}
