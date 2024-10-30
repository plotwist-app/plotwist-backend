import { makeRight } from '@/core/either'
import type { registerListBodySchema } from '@/http/schemas/register-list'

import type { z } from 'zod'

type RegisterListInput = z.infer<typeof registerListBodySchema>

export async function registerList({ title, description }: RegisterListInput) {
  // TODO: IMPLEMENT FEATURE
  return makeRight({ list: { title, description } })
}
