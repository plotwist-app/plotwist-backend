import type { FastifyReply, FastifyRequest } from 'fastify'
import {
  createImportRequestSchema,
  getDetailedImportRequestSchema,
} from '../schemas/imports'
import { providerDispatcher } from '@/domain/dispatchers/import-dispatcher'
import { GetUserImport } from '@/domain/services/imports/get-user-import-by-id'
import { DomainError } from '@/domain/errors/domain-error'

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
    const result = await providerDispatcher(userId, provider, uploadedFile)

    if (result instanceof DomainError) {
      return reply.status(result.status).send({ message: result.message })
    }

    return reply.status(200).send({ message: 'File processed successfully.' })
  } catch (error) {
    return reply
      .status(500)
      .send({ message: 'An error occurred while processing the file.' })
  }
}

export async function getDetailedImportController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { importId } = getDetailedImportRequestSchema.parse(request.params)
  const result = await GetUserImport(importId)

  if (result instanceof DomainError) {
    return reply.status(result.status).send({ message: result.message })
  }

  return reply.status(200).send(result)
}
