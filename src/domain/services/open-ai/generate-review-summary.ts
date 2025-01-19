import type { RottenTomatoesReview } from '../rotten-tomatoes/reviews'
import { createAIService } from '@/factories/ai-provider-factory'
import type { Language } from '@plotwist_app/tmdb'

export async function generateReviewSummary(
  reviews: RottenTomatoesReview[],
  language: Language
): Promise<string> {
  const prompt = `Write a short summary (maximum 200 characters) of these reviews: ${reviews.map(review => `- ${review.text}`).join('\n')}`

  const content = `You are a professional movie critic. Generate a summary of the reviews. IMPORTANT: You MUST respond in ${language} language ONLY.`
  const AIService = createAIService('openAI')

  return await AIService.generateMessage(prompt, content)
}
