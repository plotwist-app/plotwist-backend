import { getUserImport } from './get-user-import-by-id.spec'

export async function getUserImportById(id: string) {
  const result = await getUserImport(id)

  return result
}
