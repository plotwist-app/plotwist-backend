import { describe, expect, it, vi } from 'vitest'
import { isLeft, isRight, makeLeft, unwrapEither } from '@/core/either'

import { makeRawUser, makeUser } from '@/test/factories/make-user'
import { registerUser } from './register-user'
import { EmailOrUsernameAlreadyRegisteredError } from '../errors/email-or-username-already-registered-error'

import * as password from '@/utils/password'
import { HashPasswordError } from '../errors/hash-password-error'

describe('register user', () => {
  it('should be able to register a user', async () => {
    const user = makeRawUser()
    const sut = await registerUser(user)

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut)).toEqual({
      user: expect.objectContaining({
        email: user.email,
      }),
    })
  })

  it('should not be able to register a user with email already registered', async () => {
    const user = await makeUser()
    const sut = await registerUser(user)

    expect(isRight(sut)).toBe(false)
    expect(unwrapEither(sut)).toBeInstanceOf(
      EmailOrUsernameAlreadyRegisteredError
    )
  })

  it('should not be able to register a user with username already registered', async () => {
    const user = await makeUser()
    const sut = await registerUser(user)

    expect(isRight(sut)).toBe(false)
    expect(unwrapEither(sut)).toBeInstanceOf(
      EmailOrUsernameAlreadyRegisteredError
    )
  })

  it('should handle hash password error', async () => {
    vi.spyOn(password, 'hashPassword').mockRejectedValueOnce(() => {
      return makeLeft(new HashPasswordError())
    })

    const user = makeRawUser()
    const sut = await registerUser(user)

    expect(isLeft(sut)).toBe(true)
    expect(unwrapEither(sut)).toBeInstanceOf(HashPasswordError)
  })
})
