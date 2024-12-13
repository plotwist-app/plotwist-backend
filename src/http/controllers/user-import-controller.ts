import type { FastifyReply, FastifyRequest } from 'fastify'
import { createImportRequestSchema } from '../schemas/imports'
import { providerDispatcher } from '@/domain/dispatchers/import-dispatcher'

const MAXIMUM_FILE_SIZE_IN_BYTES = 1024 * 1024 * 4 // 4mb

export async function createImportController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { provider } = createImportRequestSchema.parse(request.query)

  const uploadedFile = await request.file({
    limits: { fileSize: MAXIMUM_FILE_SIZE_IN_BYTES },
  })

  const userId = request.user.id

  if (!uploadedFile) {
    return reply.status(400).send({ message: 'Invalid file provided.' })
  }

  try {
    await providerDispatcher(userId, provider, uploadedFile)
    return reply.status(200).send({ message: 'File processed successfully.' })
  } catch (error) {
    console.error(error)
    return reply
      .status(500)
      .send({ message: 'An error occurred while processing the file.' })
  }
}
