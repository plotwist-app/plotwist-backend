import { DomainError } from './domain-error'

export class CannotParseXML extends DomainError {
  constructor(message?: string) {
    super(message ?? 'Cannot parse XML to Json', 422) //  Unprocessable Entity
  }
}
