import { config } from '@/config'
import type { EmailService } from '@/ports/email-service'
import { Resend } from 'resend'

const resend = new Resend(config.services.RESEND_API_KEY)

async function sendEmail(email: string[], subject: string, html: string) {
  await resend.emails.send({
    from: 'Plotwist <dev@plotwist.app>',
    to: email,
    subject,
    html,
  })
}

const ResendAdapter: EmailService = {
  sendEmail: (email, subject, html) => sendEmail(email, subject, html),
}

export { ResendAdapter }
