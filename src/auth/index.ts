import {
  AbilityBuilder,
  type CreateAbility,
  createMongoAbility,
  type MongoAbility,
} from '@casl/ability'
import { z } from 'zod'

import type { User } from './models/user'
import { permissions } from './permissions'
import { listSubject } from './subjects/lists'
import { userSubject } from './subjects/user'

export * from './models/list'
export * from './models/user'
export * from './plans'
export * from './subjects/lists'
export * from './subjects/user'

const appAbilitiesSchema = z.union([
  userSubject,
  listSubject,
  z.tuple([z.literal('manage'), z.literal('all')]),
])

type AppAbilities = z.infer<typeof appAbilitiesSchema>

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilityFor(user: User) {
  const builder = new AbilityBuilder(createAppAbility)

  if (typeof permissions[user.actorPlan] !== 'function')
    throw new Error(`Permissions for role ${user.actorPlan} not found`)

  permissions[user.actorPlan](user, builder)

  const ability = builder.build({
    detectSubjectType(subject) {
      return subject.__typename
    },
  })

  ability.can = ability.can.bind(ability)
  ability.cannot = ability.cannot.bind(ability)

  return ability
}
