import { insertSocialLink } from '@/db/repositories/social-links-repository'
import type {
  SocialLink,
  InsertSocialLink,
} from '@/domain/entities/social-link'
import { faker } from '@faker-js/faker'

type Overrides = Partial<SocialLink> & Pick<SocialLink, 'userId'>

export function makeRawSocialLink(overrides: Overrides): InsertSocialLink {
  return {
    platform: 'INSTAGRAM',
    url: faker.internet.url(),
    ...overrides,
  }
}

export async function makeSocialLink(overrides: Overrides) {
  const [socialLink] = await insertSocialLink(makeRawSocialLink(overrides))

  return socialLink
}
