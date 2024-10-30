import { registerList } from '@/app/functions/register-list'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { verifyJwt } from '../hooks/verify-jwt'

export const registerListBodySchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  description: z.string(),
})

export async function registerListRoute(app: FastifyInstance) {
  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'POST',
      url: '/register-list',
      onRequest: [verifyJwt],
      schema: {
        description: 'Register a list',
        tags: ['List'],
        body: registerListBodySchema,
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      handler: async (request, reply) => {
        const { title, description } = registerListBodySchema.parse(
          request.body
        )

        const result = await registerList({ title, description })

        return reply.status(201).send({ list: result.right.list })
      },
    })
  )
}
