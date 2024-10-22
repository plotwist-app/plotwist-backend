import { makeRawUser, makeUser } from "@/test/factories/make-user";
import { describe, expect, it } from "vitest";
import { registerUser } from "./register-user";
import { isLeft, isRight, unwrapEither } from "@/core/either";
import { EmailAlreadyRegisteredError } from "../errors/email-already-registered-error";

describe("register user", () => {
  it("should be able to register an user", async () => {
    const { name, email } = makeRawUser();

    const sut = await registerUser({ name, email });

    expect(isRight(sut)).toBe(true);
    expect(unwrapEither(sut)).toEqual({
      user: expect.objectContaining({
        name,
      }),
    });
  });

  it("should not be able to register user with same email", async () => {
    const { email } = await makeUser();

    const sut = await registerUser({
      name: "John Doe",
      email,
    });

    expect(isLeft(sut)).toBe(true);
    expect(unwrapEither(sut)).toBeInstanceOf(EmailAlreadyRegisteredError);
  });
});
