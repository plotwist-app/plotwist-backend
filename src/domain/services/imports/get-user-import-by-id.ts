import { GetImport } from '@/db/repositories/user-import-repository'

export async function GetUserImport(id: string) {
  const result = await GetImport(id)

  return result
}
