import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { verifyJwt } from '../middlewares/verify-jwt'
import {
  createImportController,
  getDetailedImportController,
} from '../controllers/user-import-controller'
import {
  createImportRequestSchema,
  createImportResponseSchema,
  getDetailedImportRequestSchema,
  getDetailedImportResponseSchema,
} from '../schemas/imports'

export async function importRoutes(app: FastifyInstance) {
  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'POST',
      url: '/import',
      onRequest: [verifyJwt],
      schema: {
        description: 'Save imports to run',
        tags: ['Imports'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        response: createImportResponseSchema,
        querystring: createImportRequestSchema,
        consumes: ['multipart/form-data'],
      },
      handler: createImportController,
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'GET',
      url: '/import/:importId',
      onRequest: [verifyJwt],
      schema: {
        description: 'Get detailed import',
        tags: ['Imports'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        params: getDetailedImportRequestSchema,
        response: getDetailedImportResponseSchema,
      },
      handler: getDetailedImportController,
    })
  )
}
