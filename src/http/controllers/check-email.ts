import type { FastifyReply, FastifyRequest } from 'fastify'
import { checkEmailQuerySchema } from '../schemas/user'
import { checkEmail } from '@/app/functions/check-email'
import { EmailAlreadyRegisteredError } from '@/app/errors/email-already-registered'

export async function checkEmailController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { email } = checkEmailQuerySchema.parse(request.query)
  const result = await checkEmail({ email })

  if (result instanceof EmailAlreadyRegisteredError) {
    return reply.status(result.status).send({ message: result.message })
  }

  return reply.status(200).send({ available: result.available })
}
