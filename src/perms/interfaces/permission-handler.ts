import type { AbilityBuilder } from '@casl/ability'
import type { AppAbility } from '../types'
import type { UserModel } from '../models/user'

export interface PermissionHandler {
  apply(user: UserModel, builder: AbilityBuilder<AppAbility>): void
}
