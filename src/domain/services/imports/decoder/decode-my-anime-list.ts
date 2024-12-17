import type { InsertUserImportWithItems } from '@/domain/entities/import'
import type { InsertImportMovie } from '@/domain/entities/import-movies'
import type { InsertImportSeries } from '@/domain/entities/import-series'
import { MALtoDomain } from '@/domain/helpers/convert_status'
import { unzipFile } from '@/domain/helpers/unzip-file'
import { convertXmlToJson } from '@/domain/helpers/xml-to-json'
import {
  type MALAnimes,
  type MyAnimeListImport,
  SeriesType,
} from '@/domain/value-objects/my-anime-list-import'
import type { MultipartFile } from '@fastify/multipart'
import { createUserImport } from '../create-user-import'

export async function decodeMyAnimeList(
  userId: string,
  uploadedFile: MultipartFile
) {
  try {
    const unzippedContent = await unzipFile(uploadedFile)
    const parsedFile: MyAnimeListImport = convertXmlToJson(unzippedContent)

    const { movies: rawMovies, series: rawSeries } = separateByType(
      parsedFile.myanimelist.anime
    )

    const series = buildSeries(rawSeries)
    const movies = buildMovies(rawMovies)
    const userImport: InsertUserImportWithItems = {
      itemsCount: series.length + movies.length,
      provider: 'MY_ANIME_LIST',
      userId,
      importStatus: 'NOT_STARTED',
      movies,
      series,
    }

    return await createUserImport(userImport)
  } catch (error) {
    return error
  }
}

function separateByType(mediaArray: MALAnimes[]) {
  const series = mediaArray.filter(
    item => item.series_type === SeriesType.SERIES
  )
  const movies = mediaArray.filter(
    item => item.series_type === SeriesType.MOVIE
  )

  return { series, movies }
}

function buildSeries(rawSeries: MALAnimes[]) {
  const series: InsertImportSeries[] = rawSeries.map(item => {
    return {
      importStatus: 'NOT_STARTED',
      name: item.series_title,
      endDate: formatDate(item.my_finish_date),
      startDate: formatDate(item.my_start_date),
      watchedEpisodes: item.my_watched_episodes ?? null,
      userItemStatus: MALtoDomain(item.my_status),
    }
  })

  return series
}

function buildMovies(rawMovies: MALAnimes[]) {
  const movies: InsertImportMovie[] = rawMovies.map(item => {
    return {
      importStatus: 'NOT_STARTED',
      name: item.series_title,
      endDate: formatDate(item.my_finish_date),
      userItemStatus: MALtoDomain(item.my_status),
    }
  })

  return movies
}

function formatDate(date: string) {
  if (date === '0000-00-00') {
    return null
  }

  if (!date) {
    return null
  }

  return new Date(date)
}
