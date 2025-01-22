import { insertUserActivity } from '@/db/repositories/user-activities'
import type { InsertUserActivity } from '@/domain/entities/user-activity'
import { DomainError } from '@/domain/errors/domain-error'
import { trace } from '@opentelemetry/api'

export async function createUserActivity(params: InsertUserActivity) {
  const tracer = trace.getTracer('create-user-activity')
  const span = tracer.startSpan('createUserActivity', {
    attributes: {
      'user.id': params.userId,
      'activity.type': params.activityType,
    },
  })

  try {
    await insertUserActivity(params)
    span.end()
  } catch (error) {
    span.setAttributes({ 'error.message': (error as Error).message })
    span.end()

    return new DomainError('Error creating user activity', 500)
  }
}
