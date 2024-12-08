import { config } from '@/env'
import { Resend } from 'resend'

export const resend = new Resend(config.services.RESEND_API_KEY)
