import { schema } from '@/db/schema'
import type { InferInsertModel } from 'drizzle-orm'
import { faker } from '@faker-js/faker'
import { db } from '@/db'

type User = InferInsertModel<typeof schema.users>
type Overrides = Partial<User>

export function makeRawUser(overrides: Overrides = {}): User {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    username: faker.internet.username(),
    ...overrides,
  }
}

export async function makeUser(overrides: Overrides = {}) {
  const [user] = await db
    .insert(schema.users)
    .values(makeRawUser(overrides))
    .returning()

  return user
}
