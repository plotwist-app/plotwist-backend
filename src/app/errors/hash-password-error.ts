export class HashPasswordError extends Error {
  constructor() {
    super('Fail to hash password.')
  }
}
