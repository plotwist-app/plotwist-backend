import { unzipFile } from '@/domain/helpers/unzip-file'
import { convertXmlToJson } from '@/domain/helpers/xml-to-json'
import type { MultipartFile } from '@fastify/multipart'

export async function decodeMyAnimeList(
  userId: string,
  uploadedFile: MultipartFile
) {
  try {
    const unzippedContent = await unzipFile(uploadedFile)
    const parsedFile = convertXmlToJson(unzippedContent)

    return
  } catch (error) {
    return error
  }
}
