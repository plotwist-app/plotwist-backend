import { env } from '@/env'
import { TMDB } from '@plotwist_app/tmdb'

export const tmdb = TMDB(env.TMDB_ACCESS_TOKEN)
