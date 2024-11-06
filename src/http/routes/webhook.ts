import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { webhookController } from '../controllers/webhook-controller'

export async function webhookRoutes(app: FastifyInstance) {
  app.addContentTypeParser(
    'application/json',
    { parseAs: 'buffer' },
    (_req, body, done) => {
      try {
        done(null, body)
      } catch (error) {
        if (error instanceof Error) {
          done(error, undefined)
        }
      }
    }
  )

  app.after(() =>
    app.withTypeProvider<ZodTypeProvider>().route({
      method: 'POST',
      url: '/webhook',
      schema: {
        description: 'Webhook route',
        tags: ['Webhook'],
      },
      handler: webhookController,
    })
  )
}
