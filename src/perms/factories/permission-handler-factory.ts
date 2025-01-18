import type { Plan } from '../plans'
import type { PermissionHandler } from '../interfaces/permission-handler'
import { MemberPermissionHandler } from '../handlers/member-permissions'
import { ProPermissionHandler } from '../handlers/pro-permissions'

const handlers: Record<Plan, new () => PermissionHandler> = {
  MEMBER: MemberPermissionHandler,
  PRO: ProPermissionHandler,
}

export function createPermissionHandler(plan: Plan): PermissionHandler {
  const handlerClass = handlers[plan]
  if (!handlerClass)
    throw new Error(`No permission handler found for plan: ${plan}`)

  return new handlerClass()
}
