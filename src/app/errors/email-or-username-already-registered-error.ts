export class EmailOrUsernameAlreadyRegisteredError extends Error {
  constructor(message?: string) {
    super(message ?? 'Email or username is already registered.')
  }
}
