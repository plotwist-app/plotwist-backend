import { tmdb } from '@/domain/entities/tmdb'

export async function searchTMDBMovie(name: string) {
  const result = await tmdb.search.multi(name, 'en-US')

  return result
}
