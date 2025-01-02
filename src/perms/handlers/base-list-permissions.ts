import type { AbilityBuilder } from '@casl/ability'
import type { AppAbility } from '../types'
import type { UserModel } from '../models/user'
import type { PermissionHandler } from '../interfaces/permission-handler'

export class BaseListPermissionHandler implements PermissionHandler {
  apply(user: UserModel, { can, cannot }: AbilityBuilder<AppAbility>): void {
    cannot(['get', 'update', 'delete'], 'list')
    can('get', 'list', { visibility: { $eq: 'PUBLIC' } })
    can(['get', 'update'], 'list', { ownerId: { $eq: user.actorId } })
    can(['get', 'update'], 'list', { isActorContributor: { $eq: true } })
    can('delete', 'list', { ownerId: { $eq: user.actorId } })
  }
}
