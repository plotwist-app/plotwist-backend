import { getUserByEmail } from '@/db/repositories/user-repository'
import { EmailAlreadyRegisteredError } from '../errors/email-already-registered'

type AlreadyExistsEmail = {
  email: string
}

export async function alreadyExistsEmail({ email }: AlreadyExistsEmail) {
  const [user] = await getUserByEmail(email)

  if (user) {
    return new EmailAlreadyRegisteredError()
  }

  return { available: true }
}
