// src/app/errors/email-already-registered-error.ts
var EmailAlreadyRegisteredError = class extends Error {
  constructor(message) {
    super(message ?? "This e-mail is already registered.");
  }
};
export {
  EmailAlreadyRegisteredError
};
//# sourceMappingURL=email-already-registered-error.js.map