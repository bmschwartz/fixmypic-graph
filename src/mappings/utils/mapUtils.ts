import { JSONValue, TypedMap } from "@graphprotocol/graph-ts";

type IPFSData = TypedMap<string, JSONValue>;

export const toString = (value: JSONValue): string => value.toString();

export function assignValue<T>(
  jsonData: IPFSData | null,
  key: string,
  fallback: T,
  transform: (value: JSONValue) => T
): T {
  if (jsonData && jsonData.isSet(key)) {
    const value = jsonData.get(key);
    if (value !== null) {
      return transform(value);
    }
  }
  return fallback;
}
