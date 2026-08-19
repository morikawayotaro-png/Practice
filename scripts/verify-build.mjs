#!/usr/bin/env node
/**
 * dist/ のHTMLを検査する。
 * - 本文テキストがHTMLソースに含まれているか（クライアントレンダリング依存でないか）
 * - 必要なJSON-LDが入っているか
 * - meta description / OGP / 更新日 があるか
 * 使い方: npm run build && node scripts/verify-build.mjs
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = join(process.cwd(), 'dist');
if (!existsSync(DIST)) {
  console.error('dist/ がありません。先に `npm run build` を実行してください。');
  process.exit(1);
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (name.endsWith('.html')) out.push(full);
  }
  return out;
}

const stripTags = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const routeOf = (file) => {
  const rel = relative(DIST, file).replace(/\\/g, '/');
  return '/' + rel.replace(/index\.html$/, '').replace(/\/$/, '');
};

const EXPECTED_JSONLD = [
  { test: (r) => r === '/profile', type: 'Person' },
  { test: (r) => r === '/faq', type: 'FAQPage' },
  { test: (r) => r.startsWith('/stories/'), type: 'Article' },
  { test: (r) => r.startsWith('/news/') && r !== '/news', type: 'NewsArticle' },
  { test: (r) => r === '/', type: 'WebSite' },
];

const rows = [];
let failures = 0;

for (const file of walk(DIST).sort()) {
  const html = readFileSync(file, 'utf8');
  const route = routeOf(file) || '/';
  const body = html.slice(html.indexOf('<body'));
  const mainMatch = html.match(/<main[\s\S]*?<\/main>/i);
  const text = stripTags(mainMatch ? mainMatch[0] : body);

  const jsonLdBlocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  const types = [];
  let jsonLdValid = true;
  for (const block of jsonLdBlocks) {
    try {
      const parsed = JSON.parse(block[1]);
      types.push(parsed['@type']);
    } catch {
      jsonLdValid = false;
    }
  }

  const expected = EXPECTED_JSONLD.find((e) => e.test(route))?.type;
  const hasExpected = expected ? types.includes(expected) : true;
  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
  const ogTitle = /<meta property="og:title"/.test(html);
  const ogImage = /<meta property="og:image"/.test(html);
  const hasTime = /<time datetime="/.test(html);
  const hasH1 = /<h1[\s>]/.test(html);

  const ok =
    text.length >= 200 &&
    hasH1 &&
    jsonLdValid &&
    hasExpected &&
    description.length > 0 &&
    ogTitle &&
    ogImage &&
    hasTime;
  if (!ok) failures++;

  rows.push({
    route,
    本文文字数: text.length,
    h1: hasH1 ? '○' : '×',
    JSONLD: types.length ? types.join(',') : '-',
    期待型: expected ?? '-',
    型OK: hasExpected ? '○' : '×',
    desc: description.length > 0 ? '○' : '×',
    OGP: ogTitle && ogImage ? '○' : '×',
    更新日: hasTime ? '○' : '×',
    判定: ok ? 'PASS' : 'FAIL',
  });
}

console.table(rows);
console.log(`\nページ数: ${rows.length} / FAIL: ${failures}`);

// robots.txt と llms.txt
for (const f of ['robots.txt', 'llms.txt', 'sitemap-index.xml']) {
  const p = join(DIST, f);
  console.log(`${existsSync(p) ? '○' : '×'} dist/${f}`);
  if (!existsSync(p)) failures++;
}

process.exit(failures > 0 ? 1 : 0);
