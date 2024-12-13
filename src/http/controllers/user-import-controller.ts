import type { FastifyReply, FastifyRequest } from 'fastify'
import { createImportRequestSchema } from '../schemas/imports'

const MAXIMUM_FILE_SIZE_IN_BYTES = 1024 * 1024 * 4 // 4mb

export async function createImportController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { provider } = createImportRequestSchema.parse(request.query)

  return reply.status(201).send({})
}
