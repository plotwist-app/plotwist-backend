import type { AbilityBuilder } from '@casl/ability'
import type { AppAbility } from '../types'
import type { UserModel } from '../models/user'
import type { PermissionHandler } from '../interfaces/permission-handler'

export class BaseUserPermissionHandler implements PermissionHandler {
  apply(user: UserModel, { can, cannot }: AbilityBuilder<AppAbility>): void {
    can('get', 'user')

    cannot('update', 'user')
    can('update', 'user', { id: { $eq: user.actorId } })

    cannot('delete', 'user')
    can('delete', 'user', { id: { $eq: user.actorId } })

    cannot('follow', 'user')
    can('follow', 'user', {
      id: { $ne: user.actorId },
    })

    cannot('unfollow', 'user')
    can('unfollow', 'user', { id: { $ne: user.actorId } })
  }
}
