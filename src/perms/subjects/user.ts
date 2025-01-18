import { z } from 'zod'

import { userModelSchema } from '../models/user'

export const userSubject = z.tuple([
  z.union([
    z.literal('get'),
    z.literal('follow'),
    z.literal('unfollow'),
    // z.literal('block'),
    // z.literal('unblock'),
    z.literal('update'),
    z.literal('delete'),
    z.literal('get_personal_stats'),
    z.literal('get_recommendations'),
  ]),
  z.union([z.literal('user'), userModelSchema]),
])

export type UserSubject = z.infer<typeof userSubject>
