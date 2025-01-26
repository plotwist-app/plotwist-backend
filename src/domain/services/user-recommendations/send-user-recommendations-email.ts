import { emailServiceFactory } from '@/factories/resend-factory'
import type { getProUsersDetailsService } from '../users/get-pro-users'
import type { getUserRecommendationsService } from './get-user-recommendations'
import type { EmailMessage } from '@/domain/entities/email-message'
import type { Language } from '@plotwist_app/tmdb'

type User = Awaited<
  ReturnType<typeof getProUsersDetailsService>
>['users'][number]

type Recommendations = Awaited<
  ReturnType<typeof getUserRecommendationsService>
>['recommendations']

type sendUserRecommendationsEmailServiceInput = {
  user: User
  recommendations: Recommendations
  language: Language
}

const translations: Record<
  Language,
  {
    greeting: string
    enjoy: string
    subject: string
  }
> = {
  'en-US': {
    greeting: 'Hello! Here are your weekly recommendations:',
    enjoy: 'Enjoy your recommendations!',
    subject: 'Plotwist: Weekly Recommendations',
  },
  'es-ES': {
    greeting: '¡Hola! Aquí están tus recomendaciones semanales:',
    enjoy: '¡Disfruta de tus recomendaciones!',
    subject: 'Plotwist: Recomendaciones semanales',
  },
  'fr-FR': {
    greeting: 'Bonjour ! Voici vos recommandations hebdomadaires :',
    enjoy: 'Profitez bien de vos recommandations !',
    subject: 'Plotwist : Recommandations hebdomadaires',
  },
  'it-IT': {
    greeting: 'Ciao! Ecco i tuoi consigli settimanali:',
    enjoy: 'Goditi i tuoi consigli!',
    subject: 'Plotwist: Consigli settimanali',
  },
  'de-DE': {
    greeting: 'Hallo! Hier sind deine wöchentlichen Empfehlungen:',
    enjoy: 'Viel Spaß mit deinen Empfehlungen!',
    subject: 'Plotwist: Wöchentliche Empfehlungen',
  },
  'pt-BR': {
    greeting: 'Olá! Aqui estão suas recomendações semanais:',
    enjoy: 'Aproveite suas recomendações!',
    subject: 'Plotwist: Recomendações semanais',
  },
  'ja-JP': {
    greeting: 'こんにちは！今週のおすすめはこちらです：',
    enjoy: 'おすすめをお楽しみください！',
    subject: 'Plotwist: 週間おすすめ',
  },
} as const

export async function sendUserRecommendationsEmailService({
  user,
  recommendations,
  language,
}: sendUserRecommendationsEmailServiceInput) {
  const { email } = user
  const { greeting, subject, enjoy } = translations[language]

  const emailService = emailServiceFactory('Resend')
  const emailMessage = {
    to: [email],
    subject,
    html: `
      <p>${greeting}</p>
      <ul>
        ${recommendations
          .map(recommendation => {
            if ('title' in recommendation) {
              return `<li><a href="https://www.themoviedb.org/movie/${recommendation.id}">${recommendation.title}</a> (${recommendation.release_date})</li>`
            }

            return `<li><a href="https://www.themoviedb.org/tv/${recommendation.id}">${recommendation.name}</a> (${recommendation.first_air_date})</li>`
          })
          .join('')}
      </ul>
      <p>${enjoy}</p>
  `,
  }

  await emailService.sendEmail(emailMessage)
}
