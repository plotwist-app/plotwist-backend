import type { MultipartFile } from '@fastify/multipart'
import type { ProvidersEnum } from '../value_objects/providers'
import { decodeMyAnimeList } from '../services/imports/decoder/decode-my-anime-list'
import { decodeLetterboxd } from '../services/imports/decoder/decode-letterboxd'

const providerDispatchers: Record<
  ProvidersEnum,
  (userId: string, uploadedFile: MultipartFile) => Promise<void>
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

  await dispatcher(userId, uploadedFile)
}
