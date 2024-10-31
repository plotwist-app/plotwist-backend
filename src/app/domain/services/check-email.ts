import { getUserByEmail } from '@/db/repositories/user-repository'
import { EmailAlreadyRegisteredError } from '../errors/email-already-registered'

type alreadyExistsEmail = {
  email: string
}

export async function alreadyExistsEmail({ email }: alreadyExistsEmail) {
  const [user] = await getUserByEmail(email)

  if (user) {
    return new EmailAlreadyRegisteredError()
  }

  return { available: true }
}
