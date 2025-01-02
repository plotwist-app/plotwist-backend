import type { MongoAbility, CreateAbility } from '@casl/ability'
import { z } from 'zod'
import { userSubject } from './subjects/user'
import { listSubject } from './subjects/lists'

const appAbilitiesSchema = z.union([
  userSubject,
  listSubject,
  z.tuple([z.literal('manage'), z.literal('all')]),
])

export type AppAbilities = z.infer<typeof appAbilitiesSchema>
export type AppAbility = MongoAbility<AppAbilities>
export type CreateAppAbility = CreateAbility<AppAbility>

export { appAbilitiesSchema }
