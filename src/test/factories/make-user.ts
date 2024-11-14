import { insertUser } from '@/db/repositories/user-repository'
import type { InsertUserModel, User } from '@/domain/entities/user'
import { faker } from '@faker-js/faker'

type Overrides = Partial<InsertUserModel>

export function makeRawUser(overrides: Overrides = {}) {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    username: faker.internet.username(),
    ...overrides,
  }
}

export async function makeUser(overrides: Overrides = {}): Promise<User> {
  const [user] = await insertUser(makeRawUser(overrides))

  return user
}
