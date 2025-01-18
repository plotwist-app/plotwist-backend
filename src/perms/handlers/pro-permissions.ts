import type { AbilityBuilder } from '@casl/ability'
import type { AppAbility } from '../types'
import type { UserModel } from '../models/user'
import type { PermissionHandler } from '../interfaces/permission-handler'
import { BaseUserPermissionHandler } from './base-user-permissions'
import { BaseListPermissionHandler } from './base-list-permissions'

export class ProPermissionHandler implements PermissionHandler {
  private baseUserHandler = new BaseUserPermissionHandler()
  private baseListHandler = new BaseListPermissionHandler()

  apply(user: UserModel, builder: AbilityBuilder<AppAbility>): void {
    this.baseUserHandler.apply(user, builder)
    this.baseListHandler.apply(user, builder)

    const { can, cannot } = builder

    cannot('get_personal_stats', 'user')
    can('get_personal_stats', 'user', {
      plan: { $eq: 'PRO' },
    })

    cannot('get_recommendations', 'user')
    can('get_recommendations', 'user', {
      actorId: { $eq: user.actorId },
    })
  }
}
