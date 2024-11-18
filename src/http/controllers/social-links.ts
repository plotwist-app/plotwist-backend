import type { FastifyReply, FastifyRequest } from 'fastify'
import {
  getSocialLinksParamsSchema,
  socialLinksBodySchema,
} from '../schemas/social-links'
import { updateSocialLinksService } from '@/domain/services/social-links/update-social-links'
import { getSocialLinksService } from '@/domain/services/social-links/get-social-links'

export async function updateSocialLinksController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const socialLinks = socialLinksBodySchema.parse(request.body)

  await updateSocialLinksService({
    values: socialLinks,
    userId: request.user.id,
  })

  return reply.status(204).send()
}

export async function getSocialLinksController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { userId } = getSocialLinksParamsSchema.parse(request.params)

  const result = await getSocialLinksService({ userId })

  return reply.status(200).send({ socialLinks: result.socialLinks })
}
