import type { MultipartFile } from '@fastify/multipart'
import type { ProvidersEnum } from '../value-objects/providers'
import type { DetailedUserImport } from '../entities/import'
import type { DomainError } from '../errors/domain-error'

import { decodeMyAnimeList } from '../services/imports/decoder/decode-my-anime-list'
import { decodeLetterboxd } from '../services/imports/decoder/decode-letterboxd'
import { CannotProcessImportFileError } from '../errors/cannot-process-file'

const providerDispatchers: Record<
  ProvidersEnum,
  (
    userId: string,
    uploadedFile: MultipartFile
  ) => Promise<DetailedUserImport | DomainError>
> = {
  MY_ANIME_LIST: decodeMyAnimeList,
  LETTERBOXD: decodeLetterboxd,
}

export async function providerDispatcher(
  userId: string,
  provider: ProvidersEnum,
  uploadedFile: MultipartFile
) {
  const dispatcher = providerDispatchers[provider]
  if (!dispatcher) {
    throw new Error(`No dispatcher found for provider: ${provider}`)
  }

  const result = await dispatcher(userId, uploadedFile)

  if (!result) {
    throw new CannotProcessImportFileError()
  }

  return result
}
