import { z } from 'zod'

export const planSchema = z.enum(['MEMBER', 'PRO'])

export type Plan = z.infer<typeof planSchema>
