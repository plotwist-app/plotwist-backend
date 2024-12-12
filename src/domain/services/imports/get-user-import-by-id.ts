import { getImport } from '@/db/repositories/user-import-repository'

export async function GetUserImport(id: string) {
  const result = await getImport(id)

  return result
}
