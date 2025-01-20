import { config } from '@/config'
import type { FastifyRedis } from '@fastify/redis'
import puppeteer from 'puppeteer'

export type RottenTomatoesReview = {
  text: string
}

export type GetRottenTomatoesReviewsInput = {
  title: string
  mediaType: 'MOVIE' | 'TV'
}

const BRIGHT_DATA_CONFIG = {
  username: config.brightData.BRIGHT_DATA_USERNAME,
  password: config.brightData.BRIGHT_DATA_PASSWORD,
  host: config.brightData.BRIGHT_DATA_HOST,
  port: config.brightData.BRIGHT_DATA_PORT,
}

export async function scrapeRottenTomatoesReviews({
  title,
}: GetRottenTomatoesReviewsInput) {
  console.log('Starting scrape for title:', title)

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      `--proxy-server=http://${BRIGHT_DATA_CONFIG.host}:${BRIGHT_DATA_CONFIG.port}`,
    ],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
  })

  try {
    const page = await browser.newPage()

    await page.authenticate({
      username: BRIGHT_DATA_CONFIG.username,
      password: BRIGHT_DATA_CONFIG.password,
    })

    const delay = (ms: number) =>
      new Promise(resolve => setTimeout(resolve, ms))

    console.log('Testing proxy connection...')
    await page.goto('https://lumtest.com/myip.json', { timeout: 30000 })
    const ipCheckContent = await page.content()
    console.log('Proxy IP check:', ipCheckContent)

    await delay(500)
    await page.setRequestInterception(true)

    await page.goto(
      `https://www.rottentomatoes.com/search?search=${encodeURIComponent(title)}`
    )

    console.log('Waiting for search results...')
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

    console.log('Reviews scraped:', reviews)

    return reviews.filter(review => review.text !== '')
  } catch (error) {
    console.error('Scraping error:', error)
    return []
  } finally {
    await browser.close()
  }
}

const CACHE_EXPIRATION = 60 * 60 * 24 * 90 // 90 days

async function retryWithBackoff(
  fn: () => Promise<RottenTomatoesReview[]>,
  maxRetries = 3
): Promise<RottenTomatoesReview[]> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error)
      if (i === maxRetries - 1) throw error
      // Exponential backoff: 2s, 4s, 8s...
      await new Promise(resolve => setTimeout(resolve, 2 ** i * 1000))
    }
  }
  return []
}

export async function getRottenTomatoesReviewsService(
  redis: FastifyRedis,
  { title, mediaType }: GetRottenTomatoesReviewsInput
): Promise<RottenTomatoesReview[]> {
  const cacheKey = `REVIEWS:${title}:${mediaType}`
  const cachedReviews = await redis.get(cacheKey)

  if (cachedReviews) {
    return JSON.parse(cachedReviews)
  }

  const reviews = await retryWithBackoff(() =>
    scrapeRottenTomatoesReviews({ title, mediaType })
  )
  await redis.set(cacheKey, JSON.stringify(reviews), 'EX', CACHE_EXPIRATION)

  return reviews
}
