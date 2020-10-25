export function isValidAndDirty(valid, dirty) {
  return !dirty ? false : valid;
}