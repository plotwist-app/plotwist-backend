import { beforeEach, describe, expect, it } from 'vitest'
import { getUserPreferencesService } from './get-user-preferences'
import { selectUserPreferences } from '@/db/repositories/user-preferences'

vi.mock('@/db/repositories/user-preferences')

describe('get user preferences service', () => {
  let sut: typeof getUserPreferencesService

  beforeEach(() => {
    sut = getUserPreferencesService
    vi.resetAllMocks()
  })

  it('should be able to get user preferences', async () => {
    const inputUserId = 'user-1'

    const mockUserPreferences = {
      id: 'pref-1',
      userId: inputUserId,
      watchProviders: [1, 2, 3],
    }

    vi.mocked(selectUserPreferences).mockResolvedValueOnce([
      mockUserPreferences,
    ])

    const result = await sut({
      userId: inputUserId,
    })

    expect(selectUserPreferences).toHaveBeenCalledWith(inputUserId)
    expect(result.userPreferences).toEqual(mockUserPreferences)
  })

  it('should be able to return null when user has no preferences', async () => {
    const inputUserId = 'user-1'

    vi.mocked(selectUserPreferences).mockResolvedValueOnce([])

    const result = await sut({
      userId: inputUserId,
    })

    expect(selectUserPreferences).toHaveBeenCalledWith(inputUserId)
    expect(result.userPreferences).toBeNull()
  })
})
