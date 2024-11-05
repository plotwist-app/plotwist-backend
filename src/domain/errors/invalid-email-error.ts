import { DomainError } from './domain-error'

export class InvalidEmailError extends DomainError {
  constructor(message?: string) {
    super(message ?? 'Invalid email.', 400) // Bad Request
  }
}
