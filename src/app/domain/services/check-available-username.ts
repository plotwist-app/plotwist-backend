import { getUserByUsername } from '@/db/repositories/user-repository'
import { UsernameAlreadyRegisteredError } from '../errors/username-already-registered'

type CheckAvailableUsernameInterface = {
  username: string
}

export async function checkAvailableUsername({
  username,
}: CheckAvailableUsernameInterface) {
  const [user] = await getUserByUsername(username)

  if (user) {
    return new UsernameAlreadyRegisteredError()
  }

  return { available: true }
}
