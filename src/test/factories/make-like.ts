import { insertLike } from '@/db/repositories/likes-repository'
import type { InsertLike, Like } from '@/domain/entities/likes'
import { faker } from '@faker-js/faker'

type Overrides = Partial<Like> &
  Pick<Like, 'userId' | 'entityType' | 'entityId'>

export function makeRawLike(overrides: Overrides): InsertLike {
  return {
    ...overrides,
  }
}

export async function makeLike(overrides: Overrides) {
  const [like] = await insertLike(makeRawLike(overrides))

  return like
}
