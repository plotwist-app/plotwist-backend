import type { RottenTomatoesReview } from '../rotten-tomatoes/reviews'
import { openai } from '@/domain/entities/open-ai'
import type { Language } from '@plotwist_app/tmdb'

export async function generateReviewSummary(
  reviews: RottenTomatoesReview[],
  language: Language
): Promise<string> {
  const prompt = `Write a short summary (maximum 200 characters) of these reviews:
${reviews.map(review => `- ${review.text}`).join('\n')}`

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `You are a professional movie critic. Generate a summary of the reviews. IMPORTANT: You MUST respond in ${language} language ONLY.`,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.2,
    max_tokens: 200,
  })

  return response.choices[0].message.content || ''
}
