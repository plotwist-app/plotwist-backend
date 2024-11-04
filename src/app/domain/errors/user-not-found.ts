import { DomainError } from './domain-error'

export class UserNotFound extends DomainError {
  constructor(message?: string) {
    super(message ?? 'User not found.', 404) // Conflict
  }
}
