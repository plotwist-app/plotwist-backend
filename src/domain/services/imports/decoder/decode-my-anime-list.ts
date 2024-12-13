import { InsertUserImportWithItems, UserImport } from '@/domain/entities/import'
import { InsertSeriesImportWithoutImportId } from '@/domain/entities/import-series'
import { unzipFile } from '@/domain/helpers/unzip-file'
import { convertXmlToJson } from '@/domain/helpers/xml-to-json'
import {
  MALAnimes,
  MalStatus,
  MyAnimeListImport,
  SeriesType,
} from '@/domain/value_objects/my-anime-list-import'
import type { MultipartFile } from '@fastify/multipart'

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

    console.log(rawMovies)
    // const userImport: InsertUserImportWithItems = {
    //   importStatus: 'NOT_STARTED',
    //   itemsCount: items.length,
    //   provider: 'MY_ANIME_LIST',
    //   userId,
    // }

    return
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
  const series = rawSeries.map(item => {
    const userImport: InsertSeriesImportWithoutImportId = {
      importStatus: 'NOT_STARTED',
      name: item.series_title,
      endDate: item.my_finish_date ?? null,
      startDate: item.my_start_date ?? null,
      watchedEpisodes: item.my_watched_episodes ?? null,
      userItemStatus: item.my_status,
    }
  })
}

function convertStatus(status: MalStatus) {
  if (status === MalStatus.COMPLETED) {
    return 'COMPLETED'
  }
}
