import { r2Storage } from '@/domain/entities/r2-storage'
import { env } from '@/env'
import { DeleteObjectsCommand, ListObjectsV2Command } from '@aws-sdk/client-s3'

export async function deleteOldImagesService(prefix: string) {
  try {
    const listCommand = new ListObjectsV2Command({
      Bucket: env.CLOUDFLARE_BUCKET,
      Prefix: prefix,
    })

    const listResponse = await r2Storage.send(listCommand)

    if (!listResponse.Contents || listResponse.Contents.length === 0) {
      return
    }

    const objectsToDelete = listResponse.Contents.map(object => ({
      Key: object.Key,
    }))

    const deleteCommand = new DeleteObjectsCommand({
      Bucket: env.CLOUDFLARE_BUCKET,
      Delete: {
        Objects: objectsToDelete,
        Quiet: true,
      },
    })

    await r2Storage.send(deleteCommand)
  } catch (error) {
    throw new Error(`Unable to delete old images for user: prefix: ${prefix}}`)
  }
}
