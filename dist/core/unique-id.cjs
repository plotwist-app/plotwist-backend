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

// src/core/unique-id.ts
var unique_id_exports = {};
__export(unique_id_exports, {
  PREFIXES: () => PREFIXES,
  generateUniqueId: () => generateUniqueId,
  parseUniqueId: () => parseUniqueId
});
module.exports = __toCommonJS(unique_id_exports);
var import_typeid_js = require("typeid-js");
var PREFIXES = {
  user: "usr"
};
function generateUniqueId(prefixKey) {
  const prefix = PREFIXES[prefixKey];
  return (0, import_typeid_js.typeid)(prefix).toString();
}
function parseUniqueId(id) {
  const typeId = import_typeid_js.TypeID.fromString(id);
  return {
    prefix: typeId.getType(),
    id: typeId.getSuffix()
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PREFIXES,
  generateUniqueId,
  parseUniqueId
});
//# sourceMappingURL=unique-id.cjs.map