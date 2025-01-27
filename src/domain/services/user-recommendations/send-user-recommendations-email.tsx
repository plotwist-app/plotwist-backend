import { emailServiceFactory } from '@/factories/resend-factory'
import type { getProUsersDetailsService } from '../users/get-pro-users'
import type { getUserRecommendationsService } from './get-user-recommendations'
import type { EmailMessage } from '@/domain/entities/email-message'
import type { Language } from '@plotwist_app/tmdb'

import {
  RecommendationsEmail,
  recommendationsEmailTranslations,
} from '@/emails/recommendations'
import { render } from '@react-email/components'

export type User = Awaited<
  ReturnType<typeof getProUsersDetailsService>
>['users'][number]

export type Recommendations = Awaited<
  ReturnType<typeof getUserRecommendationsService>
>['recommendations']

type sendUserRecommendationsEmailServiceInput = {
  user: User
  recommendations: Recommendations
  language: Language
}

export async function sendUserRecommendationsEmailService({
  user,
  recommendations,
  language,
}: sendUserRecommendationsEmailServiceInput) {
  const { email } = user
  const { subject } = recommendationsEmailTranslations[language]

  const emailService = emailServiceFactory('Resend')
  const html = await render(
    RecommendationsEmail({
      recommendations,
      language,
      user,
    }),
    {
      pretty: true,
    }
  )
  const emailMessage: EmailMessage = {
    to: [email],
    subject,
    html,
  }

  await emailService.sendEmail(emailMessage)
}
