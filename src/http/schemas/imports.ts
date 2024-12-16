import { z } from 'zod'

export const createImportRequestSchema = z.object({
  provider: z.enum(['MY_ANIME_LIST', 'LETTERBOXD']),
})

export const createImportResponseSchema = {
  200: z.object({
    message: z.string(),
  }),
  422: z.object({
    message: z.string(),
  }),
}

export const getDetailedImportRequestSchema = z.object({
  importId: z.string().uuid(),
})

const importItem = z.object({
  id: z.string().uuid(),
  itemsCount: z.number(),
  series: z.array(
    z.object({
      importId: z.string().uuid(),
      id: z.string().uuid(),
      importStatus: z.enum(['COMPLETED', 'FAILED', 'NOT_STARTED']),
      createdAt: z.date(),
      updatedAt: z.date(),
      name: z.string(),
      tmdbId: z.number(),
      startedDate: z.date(),
      startDate: z.date(),
      endDate: z.date(),
      userItemStatus: z.enum(['WATCHLIST', 'WATCHED', 'WATCHING', 'DROPPED']),
      watchedEpisodes: z.number(),
      seriesEpisodes: z.number(),
    })
  ),
  movies: z.array(
    z.array(
      z.object({
        importId: z.string().uuid(),
        id: z.string().uuid(),
        importStatus: z.enum(['COMPLETED', 'FAILED', 'NOT_STARTED']),
        createdAt: z.date(),
        updatedAt: z.date(),
        name: z.string(),
        tmdbId: z.number(),
        endDate: z.date(),
        userItemStatus: z.enum(['WATCHLIST', 'WATCHED', 'WATCHING', 'DROPPED']),
      })
    )
  ),
  userId: z.string().uuid(),
  provider: z.enum(['MY-ANIME-LIST', 'LETTERBOXD']),
  importStatus: z.enum(['COMPLETED', 'FAILED', 'PARTIAL', 'NOT_STARTED']),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const getDetailedImportResponseSchema = {
  200: importItem,
  404: z.object({ message: z.string() }).describe('Import not found.'),
}
