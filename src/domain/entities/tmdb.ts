import { config } from '@/env'
import { TMDB } from '@plotwist_app/tmdb'

export const tmdb = TMDB(config.services.TMDB_ACCESS_TOKEN)
