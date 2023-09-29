import { KeyValue } from "@angular/common";

export function toUrlParamString(
  input: any,
  includeNulls: boolean = true,
  doubleEncode: boolean = true
): string {
  let result: Array<KeyValue<string, string>> = new Array<
    KeyValue<string, string>
  >();

  for (const key in input) {
    if (
      result.find(o => o.key === key) ||
      (input[key] == null && !includeNulls)
    )
      continue;

    result.push({ key: key, value: input[key] });
  }

  let urlString: string = "";
  result.forEach(paramItem => {
    if (urlString !== "") urlString += "&";
    urlString += `${paramItem.key}=${paramItem.value}`;
  });

  return doubleEncode ? encodeURI(urlString) : urlString;
}
