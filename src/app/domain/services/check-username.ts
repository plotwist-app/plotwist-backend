import { getUserByUsername } from '@/db/repositories/user-repository'
import { UsernameAlreadyRegisteredError } from '../errors/username-already-registered'

type AlreadyExistsUsername = {
  username: string
}

export async function alreadyExitsUsername({
  username,
}: AlreadyExistsUsername) {
  const [user] = await getUserByUsername(username)

  if (user) {
    return new UsernameAlreadyRegisteredError()
  }

  return { available: true }
}
