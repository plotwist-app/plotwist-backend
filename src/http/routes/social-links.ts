import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { verifyJwt } from '../middlewares/verify-jwt'

import {
  getSocialLinksController,
  upsertSocialLinksController,
} from '../controllers/social-links'

import {
  getSocialLinksParamsSchema,
  getSocialLinksResponseSchema,
  socialLinksBodySchema,
  upsertSocialLinksResponseSchema,
} from '../schemas/social-links'

const SOCIAL_LINKS_TAGS = ['Social links']

export async function socialLinksRoute(app: FastifyInstance) {
  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'PUT',
      url: '/social-links',
      onRequest: [verifyJwt],
      schema: {
        description: 'Upsert social links',
        tags: SOCIAL_LINKS_TAGS,
        body: socialLinksBodySchema,
        response: upsertSocialLinksResponseSchema,
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      handler: upsertSocialLinksController,
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'GET',
      url: '/social-links/by/:userId',
      schema: {
        description: 'Get social links by userId',
        tags: SOCIAL_LINKS_TAGS,
        params: getSocialLinksParamsSchema,
        response: getSocialLinksResponseSchema,
      },
      handler: upsertSocialLinksController,
    })
  )
}
