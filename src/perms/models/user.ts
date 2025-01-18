import { z } from 'zod'

import { planSchema } from '..'

export const userModelSchema = z.object({
  __typename: z.literal('user'),
  actorId: z
    .string()
    .uuid()
    .describe('The user id from who is trying to perform the action'),
  actorPlan: planSchema.describe(
    'The user plan from who is trying to perform the action'
  ),
  id: z
    .string()
    .uuid()
    .optional()
    .describe('The user id from who is going to be affected by the action'),
  plan: planSchema
    .optional()
    .describe('The user plan from who is going to be affected by the action'),
})

export type UserModel = z.infer<typeof userModelSchema>
