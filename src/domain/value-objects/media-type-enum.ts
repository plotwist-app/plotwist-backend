import type { mediaTypeEnum } from '@/db/schema'

export type MediaTypeEnum = (typeof mediaTypeEnum)['enumValues'][number]
