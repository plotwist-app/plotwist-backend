import { z } from 'zod'

import { planSchema } from '..'

export const listSchema = z.object({
  __typename: z.literal('list'),
  id: z.string().uuid().describe('The list id'),
  visibility: z
    .enum(['PUBLIC', 'NETWORK', 'PRIVATE'])
    .describe('The list visibility'),
  ownerId: z.string().uuid().describe('The list owner id'),
  ownerPlan: planSchema.describe('The list owner plan'),
  actorId: z.string().uuid().describe('The actor id'),
  actorPlan: planSchema.describe('The actor plan'),
  isActorContributor: z.boolean().describe('The actor is a contributor'),
})

export type List = z.infer<typeof listSchema>
