import type { statusEnum, importItemStatusEnum } from '@/db/schema'

export type UserItemStatus = (typeof statusEnum)['enumValues'][number]

export type ImportStatusEnum =
  (typeof importItemStatusEnum)['enumValues'][number]
