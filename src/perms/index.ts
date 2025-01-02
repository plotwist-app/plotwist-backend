import { AbilityBuilder, createMongoAbility } from '@casl/ability'
import type { UserModel } from './models/user'
import { createPermissionHandler } from './factories/permission-handler-factory'
import type { CreateAppAbility, AppAbility } from './types'

export * from './models/list'
export * from './models/user'
export * from './plans'
export * from './subjects/lists'
export * from './subjects/user'
export * from './types'

export const createAppAbility: CreateAppAbility = createMongoAbility

interface AbilityBuilderStrategy {
  buildAbility(builder: AbilityBuilder<AppAbility>): AppAbility
}

class DefaultAbilityBuilder implements AbilityBuilderStrategy {
  buildAbility(builder: AbilityBuilder<AppAbility>): AppAbility {
    return builder.build({
      detectSubjectType(subject) {
        return subject.__typename
      },
    })
  }
}

function getAbilityBuilder(): AbilityBuilderStrategy {
  return new DefaultAbilityBuilder()
}

export function defineAbilityFor(user: UserModel): AppAbility {
  const builder = new AbilityBuilder<AppAbility>(createAppAbility)
  const permissionHandler = createPermissionHandler(user.actorPlan)

  permissionHandler.apply(user, builder)

  const abilityBuilder = getAbilityBuilder()

  const ability = abilityBuilder.buildAbility(builder)
  ability.can = ability.can.bind(ability)
  ability.cannot = ability.cannot.bind(ability)

  return ability
}
