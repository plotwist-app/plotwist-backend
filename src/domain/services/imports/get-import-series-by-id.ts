import { getImportSeries } from '@/db/repositories/import-series-repository'

export async function getImportSeriesById(id: string) {
  const series = getImportSeries(id)

  return series
}
