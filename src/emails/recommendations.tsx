import { randomUUID } from 'node:crypto'
import type {
  Recommendations,
  User,
} from '@/domain/services/user-recommendations/send-user-recommendations-email'
import type { Language } from '@plotwist_app/tmdb'
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

export const recommendationsEmailTranslations: Record<
  Language,
  {
    greeting: string
    enjoy: string
    subject: string
    subtitle: string
  }
> = {
  'en-US': {
    greeting: 'Hey, {username}! 👋',
    subtitle:
      "Based on your streaming preferences, watch history, and trending content, we've curated these amazing picks just for you:",
    enjoy: 'Happy watching! 🍿',
    subject: 'Your weekly movie picks ✨',
  },
  'es-ES': {
    greeting: '¡Hola, {username}! 👋',
    subtitle:
      'Basado en tus preferencias de streaming, historial de visualización y contenido popular, hemos seleccionado estas increíbles recomendaciones para ti:',
    enjoy: '¡Disfruta del contenido! 🍿',
    subject: 'Tus películas de la semana ✨',
  },
  'fr-FR': {
    greeting: 'Salut, {username} ! 👋',
    subtitle:
      'En fonction de vos préférences de streaming, de votre historique de visionnage et du contenu tendance, nous avons sélectionné ces suggestions rien que pour vous :',
    enjoy: 'Bon visionnage ! 🍿',
    subject: 'Vos films de la semaine ✨',
  },
  'it-IT': {
    greeting: 'Ciao, {username}! 👋',
    subtitle:
      'In base alle tue preferenze di streaming, alla cronologia di visualizzazione e ai contenuti di tendenza, abbiamo selezionato questi fantastici suggerimenti per te:',
    enjoy: 'Buona visione! 🍿',
    subject: 'I tuoi film della settimana ✨',
  },
  'de-DE': {
    greeting: 'Hallo, {username}! 👋',
    subtitle:
      'Basierend auf deinen Streaming-Vorlieben, deinem Seeverlauf und beliebten Inhalten haben wir diese tollen Empfehlungen für dich zusammengestellt:',
    enjoy: 'Viel Spaß beim Schauen! 🍿',
    subject: 'Deine filmempfehlungen ✨',
  },
  'pt-BR': {
    greeting: 'Olá, {username}! 👋',
    subtitle:
      'Com base nas suas preferências de streaming, histórico de visualização e conteúdos populares, selecionamos estas recomendações especialmente para você:',
    enjoy: 'Bom entretenimento! 🍿',
    subject: 'Suas recomendações da semana ✨',
  },
  'ja-JP': {
    greeting: 'こんにちは、{username}さん！👋',
    subtitle:
      'ストリーミングの設定、視聴履歴、人気コンテンツに基づいて、あなたにぴったりのおすすめを厳選しました：',
    enjoy: '素敵な視聴体験を！🍿',
    subject: '今週のおすすめ作品 ✨',
  },
} as const

type RecommendationsEmailProps = {
  recommendations: Recommendations
  language: Language
  user: User
}

const MAX_OVERVIEW_LENGTH = 150

function truncateOverview(text: string) {
  if (text.length <= MAX_OVERVIEW_LENGTH) return text
  return `${text.slice(0, MAX_OVERVIEW_LENGTH).trim()}...`
}

export function RecommendationsEmail({
  recommendations,
  language,
  user,
}: RecommendationsEmailProps) {
  const { greeting, subject, enjoy, subtitle } =
    recommendationsEmailTranslations[language]

  const personalizedGreeting = greeting.replace('{username}', user.username)

  return (
    <Html>
      <Head />
      <Preview>{subject}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.logoContainer}>
            <div style={styles.headerContent}>
              <Img
                src="https://plotwist.app/logo-black.png"
                width="40"
                height="40"
                alt="Plotwist"
                style={styles.logo}
              />
              {user.avatarUrl && (
                <Img
                  src={user.avatarUrl}
                  width="40"
                  height="40"
                  alt="User"
                  style={styles.avatarUrl}
                />
              )}
            </div>
          </Section>
          <Section>
            <Text style={styles.greeting}>{personalizedGreeting}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>

            {recommendations.map(recommendation => {
              const href = `https://plotwist.app/${language}/${
                'title' in recommendation ? 'movies' : 'tv-series'
              }/${recommendation.id}`

              return (
                <Section key={randomUUID()} style={styles.recommendation}>
                  <Link href={href} style={styles.recommendationLink}>
                    <div style={styles.recommendationContent}>
                      <Img
                        src={`https://image.tmdb.org/t/p/w185${recommendation.poster_path}`}
                        width="92"
                        height="138"
                        alt={
                          'title' in recommendation
                            ? recommendation.title
                            : recommendation.name
                        }
                        style={styles.poster}
                      />
                      <div style={styles.info}>
                        <Text style={styles.title}>
                          {'title' in recommendation
                            ? recommendation.title
                            : recommendation.name}
                        </Text>
                        <Text style={styles.overview}>
                          {truncateOverview(recommendation.overview)}
                        </Text>
                        <Text style={styles.rating}>
                          {recommendation.vote_average.toFixed(1)}
                        </Text>
                      </div>
                    </div>
                  </Link>
                </Section>
              )
            })}

            <Hr style={styles.divider} />
            <Text style={styles.footer}>{enjoy}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

RecommendationsEmail.PreviewProps = {
  recommendations: [
    {
      id: 1,
      title: 'The Matrix',
      release_date: '1999-03-31',
      poster_path: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
      overview:
        'A computer programmer discovers a mysterious world beneath our reality.',
      vote_average: 8.7,
    },
    {
      id: 2,
      name: 'The Office',
      first_air_date: '2005-03-24',
      poster_path: '/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg',
      overview: 'A mockumentary on a group of typical office workers.',
      vote_average: 8.5,
    },
  ],
  language: 'pt-BR',
  user: {
    avatarUrl: 'https://github.com/lui7henrique.png',
    username: 'Henrique',
  },
}

export default RecommendationsEmail

const styles = {
  body: {
    backgroundColor: '#ffffff',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  container: {
    margin: '0 auto',
    padding: '16px',
    maxWidth: '580px',
    borderRadius: '0.5rem',
    border: '1px solid #E5E5E5',
  },
  greeting: {
    fontSize: '20px',
    lineHeight: '28px',
    color: '#0A0A0A',
    margin: '8px 0px',
    fontWeight: '600',
  },
  recommendation: {
    backgroundColor: '#ffffff',
    marginBottom: '16px',
  },
  recommendationLink: {
    color: '#0A0A0A',
    textDecoration: 'none',
    display: 'block',
  },
  recommendationContent: {
    display: 'flex',
  },
  poster: {
    borderRadius: '0.25rem',
    flexShrink: 0,
    objectFit: 'cover' as const,
    border: '1px solid #E5E5E5',
  },
  info: {
    flex: '1',
    marginLeft: '16px',
  },
  title: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '4px',
    marginTop: '0px',
    color: '#0A0A0A',
  },
  overview: {
    fontSize: '14px',
    lineHeight: '20px',
    color: '#71717A',
    margin: '0 0 8px',
  },
  rating: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#f1f1f1',
    backgroundColor: '#09090b',
    margin: '0',
    width: 'fit-content',
    padding: '0.125rem 0.625rem',
    borderRadius: '0.5rem',
    lineHeight: '1rem',
  },
  divider: {
    borderTop: '1px solid #E5E5E5',
    margin: '24px 0',
  },
  footer: {
    fontSize: '16px',
    color: '#737373',
    textAlign: 'center' as const,
  },
  logoContainer: {
    marginBottom: '32px',
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: '35px',
    height: '35px',
    objectFit: 'contain' as const,
  },
  subtitle: {
    fontSize: '16px',
    lineHeight: '24px',
    color: '#71717A',
    marginBottom: '24px',
    marginTop: '0px',
  },
  avatarUrl: {
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    objectFit: 'cover' as const,
    marginLeft: 'auto',
  },
}
