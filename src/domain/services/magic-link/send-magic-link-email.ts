import { resend } from '@/domain/entities/resend'

type SendMagicLinkEmailServiceInput = {
  email: string
  token: string
  url?: string
}

export async function sendMagicLinkEmailService({
  email,
  token,
  url,
}: SendMagicLinkEmailServiceInput) {
  const link = url?.includes('localhost')
    ? `${url}:3000/reset-password?token=${token}`
    : `${url}/reset-password?token=${token}`

  await resend.emails.send({
    from: 'Plotwist <dev@plotwist.app>',
    to: [email],
    subject: 'Login to Your Account',
    html: `Please use the following link to login and set your new password: <a href="${link}">Login</a>`,
  })
}
