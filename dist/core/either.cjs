"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/core/either.ts
var either_exports = {};
__export(either_exports, {
  isLeft: () => isLeft,
  isRight: () => isRight,
  makeLeft: () => makeLeft,
  makeRight: () => makeRight,
  unwrapEither: () => unwrapEither
});
module.exports = __toCommonJS(either_exports);
var isLeft = (e) => {
  return e.left !== void 0;
};
var isRight = (e) => {
  return e.right !== void 0;
};
var unwrapEither = ({
  left,
  right
}) => {
  if (right !== void 0 && left !== void 0) {
    throw new Error(
      `Received both left and right values at runtime when opening an Either
Left: ${JSON.stringify(
        left
      )}
Right: ${JSON.stringify(right)}`
    );
  }
  if (left !== void 0) {
    return left;
  }
  if (right !== void 0) {
    return right;
  }
  throw new Error(
    "Received no left or right values at runtime when opening Either"
  );
};
var makeLeft = (value) => ({ left: value });
var makeRight = (value) => ({ right: value });
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isLeft,
  isRight,
  makeLeft,
  makeRight,
  unwrapEither
});
//# sourceMappingURL=either.cjs.map