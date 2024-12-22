import * as repository from '@/db/repositories/user-import-repository'

export async function getUserImport(id: string) {
  const result = await repository.getUserImport(id)

  return result
}
