import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { verifyJwt } from '../middlewares/verify-jwt'

import {
  getSocialLinksController,
  updateSocialLinksController,
} from '../controllers/social-links'
import {
  getSocialLinksQuerySchema,
  getSocialLinksResponseSchema,
  socialLinksBodySchema,
  updateSocialLinksResponseSchema,
} from '../schemas/social-links'

const SOCIAL_LINKS_TAGS = ['Social links']

export async function socialLinksRoute(app: FastifyInstance) {
  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'PUT',
      url: '/social-links',
      onRequest: [verifyJwt],
      schema: {
        description: 'Update social links',
        tags: SOCIAL_LINKS_TAGS,
        body: socialLinksBodySchema,
        response: updateSocialLinksResponseSchema,
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      handler: updateSocialLinksController,
    })
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'GET',
      url: '/social-links',
      schema: {
        description: 'Get social links by userId',
        tags: SOCIAL_LINKS_TAGS,
        querystring: getSocialLinksQuerySchema,
        response: getSocialLinksResponseSchema,
      },
      handler: getSocialLinksController,
    })
  )
}
