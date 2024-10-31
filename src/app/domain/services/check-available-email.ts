import { getUserByEmail } from '@/db/repositories/user-repository'
import { EmailAlreadyRegisteredError } from '../errors/email-already-registered'

type CheckAvailableEmailInterface = {
  email: string
}

export async function checkAvailableEmail({
  email,
}: CheckAvailableEmailInterface) {
  const [user] = await getUserByEmail(email)

  if (user) {
    return new EmailAlreadyRegisteredError()
  }

  return { available: true }
}
