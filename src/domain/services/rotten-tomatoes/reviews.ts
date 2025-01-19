import type { FastifyRedis } from '@fastify/redis'
import puppeteer from 'puppeteer'

export type RottenTomatoesReview = {
  text: string
}

export type GetRottenTomatoesReviewsInput = {
  title: string
  mediaType: 'MOVIE' | 'TV'
}

export async function scrapeRottenTomatoesReviews({
  title,
}: GetRottenTomatoesReviewsInput) {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox'],
  })

  try {
    const page = await browser.newPage()
    await page.goto(
      `https://www.rottentomatoes.com/search?search=${encodeURIComponent(title)}`
    )

    await page.waitForSelector('search-page-media-row')

    const firstResultUrl = await page.$eval(
      'search-page-media-row a[data-qa="info-name"]',
      el => el.getAttribute('href')
    )

    if (!firstResultUrl) {
      return []
    }

    const reviews: RottenTomatoesReview[] = []

    const topCriticsReviewsUrl = `${firstResultUrl}/reviews?type=top_critics`
    await page.goto(topCriticsReviewsUrl)
    await page
      .waitForSelector('p.review-text', { timeout: 5000 })
      .catch(() => null)

    const criticReviews = await page.$$eval('p.review-text', elements =>
      elements.map(el => ({ text: el.textContent?.trim() || '' }))
    )
    reviews.push(...criticReviews)

    console.log({ criticReviews })

    const userReviewsUrl = `${firstResultUrl}/reviews?type=user`
    await page.goto(userReviewsUrl)
    await page
      .waitForSelector('p.audience-reviews__review', { timeout: 5000 })
      .catch(() => null)

    const audienceReviews = await page.$$eval(
      'p.audience-reviews__review',
      elements => elements.map(el => ({ text: el.textContent?.trim() || '' }))
    )
    reviews.push(...audienceReviews)

    return reviews.filter(review => review.text !== '')
  } finally {
    await browser.close()
  }
}

const CACHE_EXPIRATION = 60 * 60 * 24 * 90 // 90 days

export async function getRottenTomatoesReviewsService(
  redis: FastifyRedis,
  { title, mediaType }: GetRottenTomatoesReviewsInput
): Promise<RottenTomatoesReview[]> {
  const cacheKey = `REVIEWS:${title}:${mediaType}`
  const cachedReviews = await redis.get(cacheKey)

  if (cachedReviews) {
    return JSON.parse(cachedReviews) as RottenTomatoesReview[]
  }

  const reviews = await scrapeRottenTomatoesReviews({ title, mediaType })
  await redis.set(cacheKey, JSON.stringify(reviews), 'EX', CACHE_EXPIRATION)

  return reviews
}
