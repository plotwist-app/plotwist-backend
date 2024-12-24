import { r2Storage } from '@/domain/entities/r2-storage'
import { config } from '@/config'
import { Upload } from '@aws-sdk/lib-storage'
import type { Readable } from 'node:stream'

type UploadImageInput = {
  path: string
  contentType: string
  contentStream: Readable
}

export async function uploadImageService({
  path,
  contentType,
  contentStream,
}: UploadImageInput) {
  const key = path

  const upload = new Upload({
    client: r2Storage,
    params: {
      Key: key,
      Bucket: config.cloudflare.CLOUDFLARE_BUCKET,
      Body: contentStream,
      ContentType: contentType,
    },
  })

  await upload.done()

  return {
    url: new URL(key, config.cloudflare.CLOUDFLARE_PUBLIC_URL).toString(),
  }
}
