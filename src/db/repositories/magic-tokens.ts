import type { InsertMagicTokenModel } from '@/domain/entities/magic-token'
import { db } from '..'
import { schema } from '../schema'
import { eq } from 'drizzle-orm'

export async function insertMagicToken(values: InsertMagicTokenModel) {
  return db.insert(schema.magicTokens).values(values)
}

export async function selectMagicToken(token: string) {
  return db
    .select()
    .from(schema.magicTokens)
    .where(eq(schema.magicTokens.token, token))
}

export async function invalidateMagicToken(token: string) {
  return db
    .update(schema.magicTokens)
    .set({ used: true })
    .where(eq(schema.magicTokens.token, token))
}
