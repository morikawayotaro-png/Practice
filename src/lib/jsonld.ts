/**
 * JSON-LD の組み立てヘルパー。
 * 値が空文字・空配列・undefined のキーは出力しない（sameAs の未入力URLなど）。
 */
export type Json = Record<string, unknown>;

export function prune<T extends Json>(obj: T): T {
  const out: Json = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null) continue;
    if (typeof value === 'string' && value.trim() === '') continue;
    if (Array.isArray(value)) {
      const arr = value
        .map((v) => (v && typeof v === 'object' ? prune(v as Json) : v))
        .filter((v) => v !== undefined && v !== null && v !== '');
      if (arr.length === 0) continue;
      out[key] = arr;
      continue;
    }
    if (typeof value === 'object') {
      const nested = prune(value as Json);
      if (Object.keys(nested).length === 0) continue;
      out[key] = nested;
      continue;
    }
    out[key] = value;
  }
  return out as T;
}

export function absoluteUrl(path: string, siteUrl: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return new URL(path, siteUrl).toString();
}
