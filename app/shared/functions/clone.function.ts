export function clone<T>(object: T) {
  if (!object) return null;
  return JSON.parse(JSON.stringify(object)) as T;
}
