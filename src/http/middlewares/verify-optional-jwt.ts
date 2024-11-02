import type { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyOptionalJwt(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    await request.jwtVerify()
  } catch (err) {}
}
