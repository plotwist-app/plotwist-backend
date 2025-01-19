import { config } from '@/config'
import { emailServiceFactory } from '@/factories/resend-factory'

type SendMagicLinkEmailServiceInput = {
  email: string
  token: string
}

export async function sendMagicLinkEmailService({
  email,
  token,
}: SendMagicLinkEmailServiceInput) {
  const link = `${config.app.CLIENT_URL}/reset-password?token=${token}`

  const html = `Please use the following link to login and set your new password: <a href="${link}">Login</a>`

  const subject = 'Login to Your Account'

  const to = [email]

  const emailService = emailServiceFactory('Resend')

  await emailService.sendEmail(to, subject, html)
}
