import { describe, expect, it } from 'vitest'

import { makeRawUser, makeUser } from '@/test/factories/make-user'
import { hashPassword } from '@/utils/password'
import { faker } from '@faker-js/faker'

import { InvalidEmailError } from '../errors/invalid-email-error'
import { InvalidPasswordError } from '../errors/invalid-password-error'
import { login } from './login'

describe('login', () => {
  it('should be able to login', async () => {
    const password = faker.internet.password()
    const hashedPassword = await hashPassword(password)

    const user = await makeUser({ password: hashedPassword })
    const sut = await login({ email: user.email, password })

    expect(sut).toBeTruthy()
    expect(sut).toEqual({
      user: expect.objectContaining({
        email: user.email,
      }),
    })
  })

  it('should not be able to login with non-existent user', async () => {
    const user = makeRawUser()
    const sut = await login({ email: user.email, password: user.password })

    expect(sut).toBeInstanceOf(InvalidEmailError)
  })

  it('should not be able to login with invalid credentials', async () => {
    const user = await makeUser()
    const sut = await login({ email: user.email, password: user.password })

    expect(sut).toBeInstanceOf(InvalidPasswordError)
  })
})
