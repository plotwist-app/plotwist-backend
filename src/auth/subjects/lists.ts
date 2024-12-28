import { z } from 'zod'

import { listSchema } from '@/models/list'

export const listSubject = z.tuple([
  z.union([
    z.literal('get'),
    z.literal('like'),
    z.literal('clone'),
    z.literal('invite_to_list'),
    z.literal('remove_from_list'),
    z.literal('update'),
    z.literal('delete'),
    z.literal('get_stats'),
  ]),
  z.union([z.literal('list'), listSchema]),
])

export type ListSubject = z.infer<typeof listSubject>
