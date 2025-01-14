import { describe, expect, it } from 'vitest'
import { getUserPreferencesService } from './get-user-preferences'
import { makeUser } from '@/test/factories/make-user'
import { updateUserPreferencesService } from './update-user-preferences'

describe('get user preferences service', () => {
  it('should be able to get user preferences', async () => {
    const user = await makeUser()
    const watchProviders = [1, 2, 3]

    await updateUserPreferencesService({
      userId: user.id,
      watchProviders: watchProviders,
    })

    const sut = await getUserPreferencesService({
      userId: user.id,
    })

    expect(sut).toEqual({
      userPreferences: expect.objectContaining({
        id: expect.any(String),
        userId: user.id,
        watchProviders: watchProviders,
      }),
    })
  })

  it('should be able to return null when user has no preferences', async () => {
    const user = await makeUser()
    const sut = await getUserPreferencesService({
      userId: user.id,
    })

    expect(sut).toEqual({
      userPreferences: null,
    })
  })
})
