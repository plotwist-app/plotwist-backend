export class EmailAlreadyRegisteredError extends Error {
  constructor(message?: string) {
    super(message ?? 'This e-mail is already registered.')
  }
}
