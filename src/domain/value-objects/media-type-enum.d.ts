import type { mediaTypeEnum, providersEnum } from '@/db/schema'

export type MediaTypeEnum = (typeof mediaTypeEnum)['enumValues'][number]

export type ProvidersEnum = (typeof providersEnum)['enumValues'][number]
