import { describe, expect, it, beforeAll } from 'vitest'
import { makeUser } from '@/test/factories/make-user'
import { updateSocialLinksService } from './update-social-links'
import { faker } from '@faker-js/faker'
import { getSocialLinksService } from './get-social-links'
import type { User } from '@/domain/entities/user'

let user: User

const instagramURL = faker.internet.url()

describe('update social links subscription', () => {
  beforeAll(async () => {
    user = await makeUser()

    await updateSocialLinksService({
      userId: user.id,
      values: {
        INSTAGRAM: instagramURL,
      },
    })
  })

  it('should be able to create social links', async () => {
    const result = await getSocialLinksService({
      userId: user.id,
    })

    expect(result).toEqual({
      socialLinks: expect.objectContaining([
        expect.objectContaining({ url: instagramURL }),
      ]),
    })
  })

  it('should be able to update social links', async () => {
    const newInstagramURL = faker.internet.url()

    await updateSocialLinksService({
      userId: user.id,
      values: {
        INSTAGRAM: newInstagramURL,
      },
    })

    const result = await getSocialLinksService({
      userId: user.id,
    })

    expect(result).toEqual({
      socialLinks: expect.objectContaining([
        expect.objectContaining({ url: newInstagramURL }),
      ]),
    })
  })

  it('should be able to delete empty social links', async () => {
    await updateSocialLinksService({
      userId: user.id,
      values: {
        INSTAGRAM: '',
      },
    })

    const result = await getSocialLinksService({
      userId: user.id,
    })

    const hasInstagramLink = result.socialLinks.some(
      link => link.platform === 'INSTAGRAM'
    )

    expect(hasInstagramLink).toBe(false)
  })
})
