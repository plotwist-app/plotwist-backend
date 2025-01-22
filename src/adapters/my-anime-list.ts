import type { AnimeDetails } from '@/@types/my-anime-list-request'
import { config } from '@/config'
import { type Span, trace } from '@opentelemetry/api'
import axios from 'axios'

const BASE_URL = 'https://api.myanimelist.net/v2'

export async function searchAnime(query: string) {
  const tracer = trace.getTracer('my-anime-list-adapter')

  const span = tracer.startSpan('searchAnime', {
    attributes: {
      'http.method': 'GET',
      'http.url': `${BASE_URL}/anime`,
      'anime.query': query,
    },
  })

  try {
    const response = await axios.get(`${BASE_URL}/anime`, {
      params: { q: query, limit: 5 },
      headers: { 'X-MAL-Client-ID': config.myAnimeList.MAL_CLIENT_ID },
    })

    span.setAttribute('http.status_code', response.status)
    span.end()
    return response.data
  } catch (error) {
    if (error instanceof Error) {
      handleError(span, error)
    } else {
      handleError(span, new Error(`Unknown error occurred: ${error}`))
    }
  }
}

export async function searchAnimeById(animedbId: string) {
  const tracer = trace.getTracer('my-anime-list-adapter')
  const span = tracer.startSpan('searchAnimeById', {
    attributes: {
      'http.method': 'GET',
      'http.url': `${BASE_URL}/anime/${animedbId}`,
      'anime.id': animedbId,
    },
  })

  try {
    const response = await axios.get(`${BASE_URL}/anime/${animedbId}`, {
      params: {
        fields:
          'id,title,main_picture,synopsis,mean,rank,popularity,genres,start_date,end_date,num_episodes,rating,status',
      },
      headers: {
        'X-MAL-Client-ID': config.myAnimeList.MAL_CLIENT_ID,
      },
    })

    span.setAttribute('http.status_code', response.status)
    span.end()
    return response.data as AnimeDetails
  } catch (error) {
    if (error instanceof Error) {
      handleError(span, error)
    } else {
      handleError(span, new Error(`Unknown error occurred: ${error}`))
    }
  }
}

function handleError(span: Span, error: Error) {
  span.recordException(error)
  span.setStatus({ code: 2, message: error.message })
  span.end()
  throw new Error('Failed to fetch informations')
}
