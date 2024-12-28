import type { AbilityBuilder } from '@casl/ability'

import type { AppAbility, Plan, User } from '.'

type PermissionsByPlan = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

const basePermissions = (
  user: User,
  { can, cannot }: Pick<AbilityBuilder<AppAbility>, 'can' | 'cannot'>,
) => {
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

  cannot(['get', 'update', 'delete'], 'list')
  can('get', 'list', { visibility: { $eq: 'PUBLIC' } })
  can(['get', 'update'], 'list', { ownerId: { $eq: user.actorId } })
  can(['get', 'update'], 'list', { isActorContributor: { $eq: true } })

  can('delete', 'list', { ownerId: { $eq: user.actorId } })
}

export const permissions: Record<Plan, PermissionsByPlan> = {
  MEMBER: (user, { can, cannot }) => {
    basePermissions(user, { can, cannot })
    cannot('get_personal_stats', 'user')
    can('get_personal_stats', 'user', {
      id: { $ne: user.actorId },
      plan: { $eq: 'PRO' },
    }) // can get other premium users stats

    cannot('get_recommendations', 'user')
  },
  PRO: (user, { can, cannot }) => {
    basePermissions(user, { can, cannot })

    cannot('get_personal_stats', 'user')
    can('get_personal_stats', 'user', {
      plan: { $eq: 'PRO' },
    }) // can view its own and other premium users stats

    cannot('get_recommendations', 'user')
    can('get_recommendations', 'user', { actorId: { $eq: user.actorId } })
  },
}
