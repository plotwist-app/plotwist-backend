import type { Review } from '@/domain/entities/review'
import { createAIService } from '@/factories/ai-provider-factory'
import type { Language } from '@plotwist_app/tmdb'

type GenerateReviewSummaryParams = {
  reviews: Review[]
  language: Language
  title: string
}

export async function generateReviewSummaryService({
  reviews,
  language,
  title,
}: GenerateReviewSummaryParams): Promise<string> {
  const prompt = `About the movie "${title}", write a short summary (maximum 200 characters) of these reviews: ${reviews.map(review => `- ${review.review}`).join('\n')}`

  const content = `You are a professional movie critic. Generate a summary of the reviews. IMPORTANT: You MUST respond in ${language} language ONLY.`
  const AIService = createAIService('openAI')

  return await AIService.generateMessage(prompt, content)
}
