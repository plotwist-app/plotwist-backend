import type { schema } from '@/db/schema'
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'

export type UserImport = InferSelectModel<typeof schema.userImports>

export type InsertUserImport = InferInsertModel<typeof schema.userImports>
