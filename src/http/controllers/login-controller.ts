import { loginService } from '@/domain/services/login'
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { loginBodySchema } from '../schemas/login'
import { trace } from '@opentelemetry/api'

const tracer = trace.getTracer('plotwist-backend')

export async function loginController(
  request: FastifyRequest,
  reply: FastifyReply,
  app: FastifyInstance
) {
  const span = tracer.startSpan('loginController', {
    attributes: {
      endpoint: 'POST /login',
    },
  })

  try {
    const { email, password } = loginBodySchema.parse(request.body)

    span.setAttribute('user.email', email)

    const result = await loginService({
      email,
      password,
      url: `${request.protocol}://${request.hostname}`,
    })

    if (result instanceof Error) {
      span.addEvent('Login failed', { error: result.message })
      span.setStatus({ code: 2, message: 'Failed to login' })
      return reply.status(result.status).send({ message: result.message })
    }

    if (result.status) {
      span.addEvent('Login succeeded with status')
      span.setAttribute('user.status', result.status)
      span.setStatus({ code: 1 })
      return reply.status(201).send({ status: result.status })
    }

    if (result.user) {
      const token = app.jwt.sign({ id: result.user.id })
      span.addEvent('JWT generated', { userId: result.user.id })
      span.setStatus({ code: 1 })
      return reply.status(200).send({ token })
    }
  } catch (error) {
    span.recordException(error)
    span.setStatus({ code: 2, message: 'Unexpected error in loginController' })
    throw error
  } finally {
    span.end()
  }
}
