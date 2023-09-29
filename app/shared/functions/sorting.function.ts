export function sorting(item, property): string | number {
  if (property) {
    return item[property];
  }
}

export function predicateBy(prop: string, asc: boolean = true) {
  return function(a, b) {
    if (
      (typeof a[prop] === "string" &&
        typeof b[prop] === "string" &&
        a[prop].toLowerCase() > b[prop].toLowerCase()) ||
      (typeof a[prop] !== "string" &&
        typeof b[prop] !== "string" &&
        a[prop] > b[prop])
    ) {
      return asc ? 1 : -1;
    } else if (
      (typeof a[prop] === "string" &&
        typeof b[prop] === "string" &&
        a[prop].toLowerCase() < b[prop].toLowerCase()) ||
      (typeof a[prop] !== "string" &&
        typeof b[prop] !== "string" &&
        a[prop] < b[prop])
    ) {
      return asc ? -1 : 1;
    }
    return 0;
  };
}
