import type { schema } from '@/db/schema'
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'

export type UserImportItem = InferSelectModel<typeof schema.userImportItems>
export type InsertUserImportItem = InferInsertModel<
  typeof schema.userImportItems
>

export type InsertUserImportWithoutImportId = Omit<
  InsertUserImportItem,
  'importId'
>
