import { z } from 'zod'

import { userSchema } from '@/models/user'

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
  z.union([z.literal('user'), userSchema]),
])

export type UserSubject = z.infer<typeof userSubject>
