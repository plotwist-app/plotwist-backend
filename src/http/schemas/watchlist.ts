import { schema } from '@/db/schema'
import { LanguagesEnum } from '@/domain/value_objects/languages_enum'
import { languages, type TvSerieDetails } from '@plotwist_app/tmdb'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const createWatchlistItemBodySchema = createInsertSchema(
  schema.watchlistItems
).pick({ tmdbId: true, mediaType: true })

export const getWatchlistItemsResponseSchema = {
  200: z.array(
    createSelectSchema(schema.watchlistItems).extend({
      title: z.string(),
      posterPath: z.string().nullable(),
      backdropPath: z.string().nullable(),
    })
  ),
}
