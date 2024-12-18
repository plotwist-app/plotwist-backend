import { config } from '@/env'
import { TMDB } from '@plotwist_app/tmdb'

export const tmdb = TMDB(config.services.TMDB_ACCESS_TOKEN)

console.log('TMDB:', tmdb)
console.log('TMDB_ACCESS_TOKEN:', config.services.TMDB_ACCESS_TOKEN)
