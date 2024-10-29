export class EmailOrUsernameAlreadyRegisteredError extends Error {
  constructor(message?: string) {
    super(message ?? 'E-mail or username is already registered.')
  }
}
