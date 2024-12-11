import type { GetImportResult } from '../repositories/user-import-repository'

function mapDates<
  T extends { createdAt: string | Date; updatedAt: string | Date },
>(items: T[]): T[] {
  return items.map(item => ({
    ...item,
    createdAt: new Date(item.createdAt),
    updatedAt: new Date(item.updatedAt),
  }))
}

export function GetUserImportItemsMapper({
  movies,
  series,
  userImport,
}: GetImportResult): GetImportResult {
  userImport.createdAt = new Date(userImport.createdAt)
  userImport.updatedAt = new Date(userImport.updatedAt)

  const mappedMovies = mapDates(movies)
  const mappedSeries = mapDates(series)

  return { userImport, movies: mappedMovies, series: mappedSeries }
}
