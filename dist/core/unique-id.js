// src/core/unique-id.ts
import { TypeID, typeid } from "typeid-js";
var PREFIXES = {
  user: "usr"
};
function generateUniqueId(prefixKey) {
  const prefix = PREFIXES[prefixKey];
  return typeid(prefix).toString();
}
function parseUniqueId(id) {
  const typeId = TypeID.fromString(id);
  return {
    prefix: typeId.getType(),
    id: typeId.getSuffix()
  };
}
export {
  PREFIXES,
  generateUniqueId,
  parseUniqueId
};
//# sourceMappingURL=unique-id.js.map