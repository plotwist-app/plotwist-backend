import type { FastifyReply, FastifyRequest } from 'fastify'
import { createImageQuerySchema } from '../schemas/images'
import { deleteOldImagesService } from '@/domain/services/r2-storage/delete-old-images'
import { uploadImageService } from '@/domain/services/r2-storage/upload-image'

const MAXIMUM_FILE_SIZE_IN_BYTES = 1024 * 1024 * 4 // 4mb

export async function createImageController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { folder } = createImageQuerySchema.parse(request.query)
  const uploadedFile = await request.file({
    limits: { fileSize: MAXIMUM_FILE_SIZE_IN_BYTES },
  })

  if (!uploadedFile) {
    return reply.status(400).send({ message: 'Invalid file provided.' })
  }

  const { file: contentStream, mimetype } = uploadedFile

  const timestamp = Date.now()
  const fileName = `${request.user.id}-${timestamp}`

  await deleteOldImagesService(`${folder}/${request.user.id}`)

  const { url } = await uploadImageService({
    path: `${folder}/${fileName}`,
    contentStream,
    contentType: mimetype,
  })

  return reply.status(201).send({ url })
}
