import { beforeEach, describe, expect, it } from 'vitest'
import { updateUserPreferencesService } from './update-user-preferences'
import { updateUserPreferences } from '@/db/repositories/user-preferences'

vi.mock('@/db/repositories/user-preferences')

describe('update user preferences service', () => {
  let sut: typeof updateUserPreferencesService

  beforeEach(() => {
    sut = updateUserPreferencesService
    vi.resetAllMocks()
  })

  it('should be able to update user preferences', async () => {
    const inputUserId = 'user-1'
    const inputWatchProviders = [1, 2, 3]

    const mockUserPreferences = {
      id: 'pref-1',
      userId: inputUserId,
      watchProviders: inputWatchProviders,
    }

    vi.mocked(updateUserPreferences).mockResolvedValueOnce([
      mockUserPreferences,
    ])

    const result = await sut({
      userId: inputUserId,
      watchProviders: inputWatchProviders,
    })

    expect(updateUserPreferences).toHaveBeenCalledWith({
      userId: inputUserId,
      watchProviders: inputWatchProviders,
    })

    expect(result.userPreferences).toEqual(mockUserPreferences)
  })
})
