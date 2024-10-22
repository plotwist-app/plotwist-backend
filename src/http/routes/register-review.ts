import { languages, mediaType } from '@/db/schema/generated'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

const bodySchema = z.object({
  tmdbId: z.string().min(1, 'TMDB ID is required'),
  mediaType: z.enum(mediaType.enumValues),
  rating: z.number().min(1, 'Rating is required'),
  review: z.string().min(1, 'Review is required'),
  language: z.enum(languages.enumValues),
})

export async function registerReviewRoute(app: FastifyInstance) {
  app.after(() => {
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'POST',
      url: '/register-review',
      schema: {
        description: 'Register a review',
        tags: ['Review'],
        body: bodySchema,
      },
      handler: async (request, reply) => {
        const { language, mediaType, rating, review } = request.body

        return reply.status(201).send({ message: 'hello' })

        // const { name, email, password } = request.body
        // // const result = await registerHost({ name, email, password })
        // if (isLeft(result)) {
        //   const error = result.left
        //   switch (error.constructor.name) {
        //     case 'HostEmailAlreadyRegisteredError':
        //       return reply.status(409).send({ message: error.message })
        //     default:
        //       return reply.status(400).send()
        //   }
        // }
        // return reply.status(201).send({ host: result.right.host })
      },
    })
  })
}
